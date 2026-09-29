import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { TrendingUp, Calendar, Info, Activity, AlertCircle, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';
import { HISTORICAL_PRICE_SERIES, GradePriceHistory, PriceDataPoint } from '../data/priceHistoryData';
import { useCurrency } from './CurrencyContext';
import { useLanguage } from '../context/LanguageContext';

interface HoveredData {
  date: string;
  timestamp: number;
  event?: string;
  points: Array<{
    gradeId: string;
    gradeName: string;
    color: string;
    price: number;
    volume: number;
  }>;
  xPos: number;
}

export function PriceFluctuationChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const { currency, formatPrice } = useCurrency();
  const { t } = useLanguage();

  // State: selected grades to display
  const [selectedGradeIds, setSelectedGradeIds] = useState<string[]>([
    'grade-a-king',
    'grade-coral-female',
    'grade-soft-shell',
  ]);

  // State: Time range (months)
  const [timeRangeMonths, setTimeRangeMonths] = useState<number>(18); // 6, 12, 18

  // State: Primary focused grade for detailed stats
  const [focusGradeId, setFocusGradeId] = useState<string>('grade-a-king');

  // State: Hovered point information
  const [hoveredData, setHoveredData] = useState<HoveredData | null>(null);

  // Toggle grade line on/off
  const toggleGrade = (gradeId: string) => {
    setSelectedGradeIds((prev) => {
      if (prev.includes(gradeId)) {
        // Prevent deselecting all
        if (prev.length <= 1) return prev;
        return prev.filter((id) => id !== gradeId);
      } else {
        return [...prev, gradeId];
      }
    });
    setFocusGradeId(gradeId);
  };

  // Filter series according to selected time range
  const filteredSeries = useMemo(() => {
    return HISTORICAL_PRICE_SERIES.map((series) => {
      const sliceCount = timeRangeMonths;
      const slicedData = series.data.slice(-sliceCount);
      return {
        ...series,
        data: slicedData,
      };
    });
  }, [timeRangeMonths]);

  // Focused grade details
  const focusedGrade = useMemo(() => {
    return (
      HISTORICAL_PRICE_SERIES.find((g) => g.gradeId === focusGradeId) ||
      HISTORICAL_PRICE_SERIES[0]
    );
  }, [focusGradeId]);

  // Focused grade change calculation
  const focusedGradeChange = useMemo(() => {
    const data = focusedGrade.data.slice(-timeRangeMonths);
    if (data.length < 2) return { diff: 0, pct: 0, isPositive: true };
    const first = currency === 'INR' ? data[0].inrPrice : data[0].usdPrice;
    const last = currency === 'INR' ? data[data.length - 1].inrPrice : data[data.length - 1].usdPrice;
    const diff = last - first;
    const pct = ((diff / first) * 100).toFixed(1);
    return {
      diff,
      pct: Math.abs(Number(pct)),
      isPositive: diff >= 0,
    };
  }, [focusedGrade, timeRangeMonths, currency]);

  // Render D3 chart
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth || 800;
    const height = 400;
    const margin = { top: 25, right: 30, bottom: 45, left: 60 };
    const innerWidth = containerWidth - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('viewBox', `0 0 ${containerWidth} ${height}`)
      .attr('width', '100%')
      .attr('height', height);

    // Filter active series
    const activeSeries = filteredSeries.filter((s) => selectedGradeIds.includes(s.gradeId));
    if (activeSeries.length === 0) return;

    // Collect all timestamps
    const sampleSeries = activeSeries[0];
    const timestamps = sampleSeries.data.map((d) => d.timestamp);

    // Calculate domain for X and Y
    const xExtent = d3.extent(timestamps) as [number, number];

    let yMin = Infinity;
    let yMax = -Infinity;

    activeSeries.forEach((series) => {
      series.data.forEach((d) => {
        const val = currency === 'INR' ? d.inrPrice : d.usdPrice;
        if (val < yMin) yMin = val;
        if (val > yMax) yMax = val;
      });
    });

    // Add padding to Y scale
    const yPadding = (yMax - yMin) * 0.15 || 50;
    const yScaleDomain = [Math.max(0, yMin - yPadding), yMax + yPadding];

    // Scales
    const xScale = d3.scaleTime().domain(xExtent).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain(yScaleDomain).range([innerHeight, 0]);

    // Definitions (gradients, clip-paths)
    const defs = svg.append('defs');

    // Create defs gradients for active series areas
    activeSeries.forEach((series) => {
      const gradientId = `area-gradient-${series.gradeId}`;
      const grad = defs
        .append('linearGradient')
        .attr('id', gradientId)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');

      grad
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', series.color)
        .attr('stop-opacity', 0.25);

      grad
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', series.color)
        .attr('stop-opacity', 0.0);
    });

    // Main Chart Group
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Horizontal Grid Lines
    const yAxisGrid = d3
      .axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickFormat(() => '')
      .ticks(6);

    g.append('g')
      .attr('class', 'grid-lines')
      .call(yAxisGrid)
      .selectAll('line')
      .attr('stroke', '#1e293b')
      .attr('stroke-dasharray', '3 3')
      .attr('stroke-opacity', 0.7);

    g.select('.grid-lines .domain').remove();

    // X Axis
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(containerWidth < 600 ? 5 : 8)
      .tickFormat((d) => d3.timeFormat('%b %y')(d as Date));

    const xAxisGroup = g
      .append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis);

    xAxisGroup.select('.domain').attr('stroke', '#334155');
    xAxisGroup
      .selectAll('text')
      .attr('fill', '#94a3b8')
      .attr('font-size', '11px')
      .attr('font-family', 'sans-serif')
      .attr('dy', '1.2em');
    xAxisGroup.selectAll('line').attr('stroke', '#334155');

    // Y Axis
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(6)
      .tickFormat((d) => {
        const num = d as number;
        return currency === 'INR' ? `₹${num.toLocaleString('en-IN')}` : `$${num.toFixed(0)}`;
      });

    const yAxisGroup = g.append('g').call(yAxis);
    yAxisGroup.select('.domain').remove();
    yAxisGroup
      .selectAll('text')
      .attr('fill', '#94a3b8')
      .attr('font-size', '11px')
      .attr('font-family', 'sans-serif');
    yAxisGroup.selectAll('line').remove();

    // D3 Line and Area Generators
    const lineGenerator = d3
      .line<PriceDataPoint>()
      .x((d) => xScale(d.timestamp))
      .y((d) => yScale(currency === 'INR' ? d.inrPrice : d.usdPrice))
      .curve(d3.curveMonotoneX);

    const areaGenerator = d3
      .area<PriceDataPoint>()
      .x((d) => xScale(d.timestamp))
      .y0(innerHeight)
      .y1((d) => yScale(currency === 'INR' ? d.inrPrice : d.usdPrice))
      .curve(d3.curveMonotoneX);

    // Render area for focused grade only (to keep chart uncluttered)
    const focusedSeries = activeSeries.find((s) => s.gradeId === focusGradeId);
    if (focusedSeries) {
      g.append('path')
        .datum(focusedSeries.data)
        .attr('class', 'area-path')
        .attr('fill', `url(#area-gradient-${focusedSeries.gradeId})`)
        .attr('d', areaGenerator)
        .attr('opacity', 0.9);
    }

    // Render Lines for each active series
    activeSeries.forEach((series) => {
      const isFocused = series.gradeId === focusGradeId;

      // Draw Path
      const path = g
        .append('path')
        .datum(series.data)
        .attr('fill', 'none')
        .attr('stroke', series.color)
        .attr('stroke-width', isFocused ? 3 : 2)
        .attr('stroke-opacity', isFocused ? 1 : 0.65)
        .attr('d', lineGenerator);

      // Animation on load
      const totalLength = (path.node() as SVGPathElement)?.getTotalLength() || 0;
      path
        .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(800)
        .ease(d3.easeCubicOut)
        .attr('stroke-dashoffset', 0);

      // Data Circles
      g.selectAll(`.dot-${series.gradeId}`)
        .data(series.data)
        .enter()
        .append('circle')
        .attr('class', `dot-${series.gradeId}`)
        .attr('cx', (d) => xScale(d.timestamp))
        .attr('cy', (d) => yScale(currency === 'INR' ? d.inrPrice : d.usdPrice))
        .attr('r', isFocused ? 3.5 : 2.5)
        .attr('fill', '#090e17')
        .attr('stroke', series.color)
        .attr('stroke-width', 2);
    });

    // Market event vertical flags (if any points have marketEvent)
    const eventPoints: Array<{ x: number; y: number; event: string; color: string }> = [];
    activeSeries.forEach((series) => {
      series.data.forEach((d) => {
        if (d.marketEvent && series.gradeId === focusGradeId) {
          eventPoints.push({
            x: xScale(d.timestamp),
            y: yScale(currency === 'INR' ? d.inrPrice : d.usdPrice),
            event: d.marketEvent,
            color: series.color,
          });
        }
      });
    });

    eventPoints.forEach((ep) => {
      // Dotted pin line
      g.append('line')
        .attr('x1', ep.x)
        .attr('x2', ep.x)
        .attr('y1', ep.y)
        .attr('y2', innerHeight)
        .attr('stroke', '#475569')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2 2');

      // Pulse pin head
      g.append('circle')
        .attr('cx', ep.x)
        .attr('cy', ep.y)
        .attr('r', 5)
        .attr('fill', ep.color)
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 1.5)
        .attr('opacity', 0.9);
    });

    // Crosshair Guide Elements
    const crosshairLine = g
      .append('line')
      .attr('class', 'crosshair')
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', '#38bdf8')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3 3')
      .style('opacity', 0);

    const highlightDots = g.append('g').attr('class', 'highlight-dots');

    // Bisector for timestamp lookup
    const bisectDate = d3.bisector<PriceDataPoint, number>((d) => d.timestamp).center;

    // Overlay Rect for Interactive Hover Tracking
    const overlay = g
      .append('rect')
      .attr('class', 'overlay')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .style('cursor', 'crosshair');

    overlay
      .on('mousemove', function (event) {
        const [pointerX] = d3.pointer(event);
        const xDate = xScale.invert(pointerX).getTime();

        const index = bisectDate(sampleSeries.data, xDate);
        const clampedIndex = Math.max(0, Math.min(sampleSeries.data.length - 1, index));
        const currentDataPoint = sampleSeries.data[clampedIndex];
        if (!currentDataPoint) return;

        const currentX = xScale(currentDataPoint.timestamp);

        // Show and reposition crosshair
        crosshairLine
          .attr('x1', currentX)
          .attr('x2', currentX)
          .style('opacity', 1);

        // Update highlight dots
        highlightDots.selectAll('*').remove();

        const points: Array<{
          gradeId: string;
          gradeName: string;
          color: string;
          price: number;
          volume: number;
        }> = [];

        let eventText = currentDataPoint.marketEvent;

        activeSeries.forEach((series) => {
          const pt = series.data[clampedIndex];
          if (pt) {
            const price = currency === 'INR' ? pt.inrPrice : pt.usdPrice;
            points.push({
              gradeId: series.gradeId,
              gradeName: series.shortName,
              color: series.color,
              price,
              volume: pt.volumeMetricTons,
            });

            if (pt.marketEvent) {
              eventText = pt.marketEvent;
            }

            // Glow outer circle
            highlightDots
              .append('circle')
              .attr('cx', currentX)
              .attr('cy', yScale(price))
              .attr('r', 6)
              .attr('fill', series.color)
              .attr('opacity', 0.35);

            // Center solid dot
            highlightDots
              .append('circle')
              .attr('cx', currentX)
              .attr('cy', yScale(price))
              .attr('r', 4)
              .attr('fill', series.color)
              .attr('stroke', '#ffffff')
              .attr('stroke-width', 2);
          }
        });

        // Set React tooltip state
        setHoveredData({
          date: currentDataPoint.date,
          timestamp: currentDataPoint.timestamp,
          event: eventText,
          points,
          xPos: currentX + margin.left,
        });
      })
      .on('mouseleave', function () {
        crosshairLine.style('opacity', 0);
        highlightDots.selectAll('*').remove();
        setHoveredData(null);
      });
  }, [filteredSeries, selectedGradeIds, focusGradeId, currency, timeRangeMonths]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Title and Range Selectors */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>{t.chartKicker}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {t.chartTitle}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.chartDescription}
          </p>
        </div>

        {/* Time Horizon Selector */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex items-center gap-1">
            {[
              { label: '6M', value: 6 },
              { label: '12M', value: 12 },
              { label: '18M (All)', value: 18 },
            ].map((period) => (
              <button
                key={period.value}
                onClick={() => setTimeRangeMonths(period.value)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  timeRangeMonths === period.value
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>

          <div className="px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-xs font-mono text-cyan-300">
            {currency === 'INR' ? '₹ INR / kg' : '$ USD / kg'}
          </div>
        </div>
      </div>

      {/* Grade Toggles: Multi-series Selection Bar */}
      <div className="flex items-center flex-wrap gap-2 pt-1">
        <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.chartToggleSeries}</span>
        </span>
        {HISTORICAL_PRICE_SERIES.map((grade) => {
          const isSelected = selectedGradeIds.includes(grade.gradeId);
          const isFocused = focusGradeId === grade.gradeId;

          return (
            <button
              key={grade.gradeId}
              onClick={() => toggleGrade(grade.gradeId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                isSelected
                  ? isFocused
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-slate-950 text-slate-200'
                  : 'bg-slate-950/50 text-slate-500 border-slate-800/60 opacity-60'
              }`}
              style={{
                borderColor: isSelected ? grade.color : undefined,
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: isSelected ? grade.color : '#475569' }}
              />
              <span>{grade.shortName}</span>
              {isSelected && (
                <span className="text-[10px] text-slate-400 font-mono">
                  {formatPrice(grade.currentINR, { perKg: false })}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Chart Canvas Area */}
      <div className="relative" ref={containerRef}>
        <svg ref={svgRef} className="w-full overflow-visible" />

        {/* Dynamic Hover Tooltip HUD Card */}
        {hoveredData && (
          <div
            className="absolute top-3 pointer-events-none z-20 bg-slate-950/95 border border-slate-700/80 rounded-xl p-3.5 shadow-2xl backdrop-blur-md transition-all duration-75 text-xs min-w-[240px]"
            style={{
              left: `${Math.min(
                Math.max(10, hoveredData.xPos - 120),
                (containerRef.current?.clientWidth || 800) - 260
              )}px`,
            }}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{hoveredData.date}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono uppercase">Audited Spot</span>
            </div>

            <div className="space-y-1.5">
              {hoveredData.points.map((pt) => (
                <div key={pt.gradeId} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: pt.color }}
                    />
                    <span className="text-slate-300">{pt.gradeName}</span>
                  </div>
                  <span className="font-bold text-white font-mono">
                    {currency === 'INR'
                      ? `₹${pt.price.toLocaleString('en-IN')}`
                      : `$${pt.price.toFixed(2)}`}{' '}
                    <span className="text-[10px] font-normal text-slate-400">/kg</span>
                  </span>
                </div>
              ))}
            </div>

            {hoveredData.event && (
              <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-amber-300 flex items-start gap-1.5 leading-tight">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{t.chartMarketEvent}: {hoveredData.event}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Metrics Summary Strip for Focused Specimen Grade */}
      <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 block font-medium">
            {t.chartBaselineGrade}
          </span>
          <div className="font-bold text-white truncate text-sm">
            {focusedGrade.shortName}
          </div>
          <div className="text-[10px] text-cyan-400">
            Selected for Volatility Metric
          </div>
        </div>

        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 block font-medium">
            {t.chartSpotRate}
          </span>
          <div className="text-lg font-bold text-cyan-300 font-mono">
            {formatPrice(focusedGrade.currentINR, { perKg: true })}
          </div>
          <div
            className={`text-[10px] flex items-center gap-1 font-semibold ${
              focusedGradeChange.isPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {focusedGradeChange.isPositive ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            <span>
              {focusedGradeChange.isPositive ? '+' : '-'}
              {focusedGradeChange.pct}% ({timeRangeMonths}M trend)
            </span>
          </div>
        </div>

        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 block font-medium">
            {t.chartRange}
          </span>
          <div className="text-sm font-bold text-slate-200 font-mono">
            {formatPrice(focusedGrade.minINR)} - {formatPrice(focusedGrade.maxINR)}
          </div>
          <div className="text-[10px] text-slate-400">
            Avg: <strong className="text-white">{formatPrice(focusedGrade.avgINR)}</strong>
          </div>
        </div>

        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 block font-medium">
            {t.chartVolatility}
          </span>
          <div className="text-lg font-bold text-emerald-400 font-mono">
            ±{focusedGrade.volatilityPercentage}%
          </div>
          <div className="text-[10px] text-slate-400">
            {t.chartVolatilityNote}
          </div>
        </div>
      </div>
    </div>
  );
}
