import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  Building2,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isAi?: boolean;
  suggestedQuestions?: string[];
  showRfqCta?: boolean;
}

interface LiveSupportWidgetProps {
  onOpenInquiry: (subject?: string) => void;
}

const STARTER_PROMPTS = [
  'What are the biosecurity requirements for Japan MAFF?',
  'What are Singapore SFA import permit rules?',
  'What documents are needed for US FDA & USFWS 3-177?',
  'How does the 95%+ live arrival guarantee work?',
  'What is the commercial MOQ and airfreight packaging?',
];

export function LiveSupportWidget({ onOpenInquiry }: LiveSupportWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `**Welcome to Dragon Crab Export & Compliance Desk** 🦀

I am your real-time AI trade advisor. Ask me anything about:
• **Customs Tariffs & HS Code 0306.33** (Japan, Singapore, UAE, USA, EU, Hong Kong, UK, Australia)
• **Veterinary Biosecurity** (MAFF AQS, SFA TradeNet, USFWS Form 3-177, TRACES-NT)
• **Cold-Chain Air-Cargo Logistics** & our **95%+ Live Survival SLA**
• **Vertical RAS Crab Apartments** & sustainable depuration technology

How may I assist your seafood import operations today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAi: true,
      suggestedQuestions: STARTER_PROMPTS.slice(0, 3),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    const userMessageId = `user_${Date.now()}`;
    const userMsg: Message = {
      id: userMessageId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Build history for context
    const historyPayload = messages.slice(-5).map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text,
    }));

    try {
      const response = await fetch('/api/live-support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: Message = {
        id: `assist_${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Thank you for your inquiry. Our export desk is prepared to assist with your consignment specifications.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAi: data.isAi ?? true,
        suggestedQuestions: data.suggestedQuestions || [],
        showRfqCta: true,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
    } catch {
      // Local fallback in case of connection drop
      const fallbackMsg: Message = {
        id: `assist_${Date.now()}`,
        sender: 'assistant',
        text: `**Trade Compliance Notice:**
Dragon Crab consignments operate under standardized **HS Code 0306.33** ("Crabs, live, fresh or chilled") accompanied by government veterinary health certificates (freedom from WSSV and EHP), pre-flight cold-chain conditioning reports, and custom insulated packaging with a contractual **95%+ live arrival guarantee**.

Would you like to initiate a formal commercial quotation with our sales desk?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAi: false,
        showRfqCta: true,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        sender: 'assistant',
        text: `Conversation cleared. Ready for your export compliance, customs tariff, or logistics questions.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAi: true,
        suggestedQuestions: STARTER_PROMPTS.slice(0, 3),
      },
    ]);
  };

  const handleLaunchRfq = (context?: string) => {
    const subject = context ? `Wholesale RFQ: ${context.slice(0, 45)}...` : 'Wholesale Commercial Quotation';
    onOpenInquiry(subject);
  };

  // Simple markdown renderer for bolding, bullet points, and headers
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return (
      <div className="space-y-1.5 leading-relaxed text-xs">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          // Bullet points
          if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            const content = line.trim().replace(/^[•\-]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1">
                <span className="text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                <span dangerouslySetInnerHTML={{ __html: formatInline(content) }} />
              </div>
            );
          }

          // Numbered list
          if (/^\d+\.\s/.test(line.trim())) {
            return (
              <div key={idx} className="pl-2" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
            );
          }

          return (
            <p key={idx} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
          );
        })}
      </div>
    );
  };

  const formatInline = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-cyan-300 font-medium">$1</em>');
  };

  return (
    <>
      {/* Floating Action Button in Corner of Screen */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {/* Pulsing glow ring */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 opacity-40 blur-sm animate-pulse" />
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Live Trade Support"
            className={`relative flex items-center gap-2.5 px-4 py-3 rounded-full text-xs font-bold transition-all shadow-[0_8px_30px_rgba(0,0,0,0.6)] cursor-pointer border ${
              isOpen
                ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                : 'bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 border-cyan-400/60 text-white hover:border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
            }`}
          >
            {isOpen ? (
              <>
                <ChevronDown className="w-4 h-4 text-cyan-400" />
                <span>Minimize Desk</span>
              </>
            ) : (
              <>
                <div className="relative">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-ping" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[11px] font-extrabold tracking-tight text-white flex items-center gap-1">
                    Live Trade Support
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  </span>
                  <span className="text-[9px] text-cyan-300 font-medium">
                    AI Export & Compliance Desk
                  </span>
                </div>
                {unreadCount > 0 && (
                  <span className="ml-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* Expandable Live Support Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-22 right-4 sm:right-6 z-40 w-[calc(100vw-32px)] sm:w-[420px] h-[550px] max-h-[calc(100vh-120px)] bg-slate-950/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden text-slate-100"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative p-2 rounded-xl bg-cyan-950/80 border border-cyan-800/80 text-cyan-400">
                  <Bot className="w-4 h-4" />
                  <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Trade & Export Compliance Desk
                    </h3>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/60 uppercase">
                      AI Powered
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Instant Answers • HS 0306.33 Specialists</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearHistory}
                  title="Clear chat history"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close support window"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin scrollbar-thumb-slate-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-500">
                    {msg.sender === 'user' ? (
                      <>
                        <span>You</span>
                        <User className="w-3 h-3 text-cyan-400" />
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3 h-3 text-cyan-400" />
                        <span className="font-semibold text-slate-400">Trade Compliance Officer</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </>
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`p-3.5 rounded-2xl max-w-[92%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-teal-500 text-slate-950 font-medium rounded-tr-none shadow-md'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
                    }`}
                  >
                    {renderFormattedText(msg.text)}

                    {/* Quick Follow-up Question Chips */}
                    {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/80 mt-2 space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                          Suggested Inquiries:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.suggestedQuestions.map((q, qIdx) => (
                            <button
                              key={qIdx}
                              onClick={() => handleSendMessage(q)}
                              className="text-[10px] bg-slate-950/80 hover:bg-cyan-950 text-cyan-300 hover:text-cyan-200 border border-slate-800 hover:border-cyan-700/60 rounded-md px-2 py-1 transition-all text-left cursor-pointer"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* In-Message Direct RFQ Action */}
                    {msg.showRfqCta && (
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-2">
                        <span className="text-[10px] text-slate-400">
                          Need formal CIF pricing or flight bookings?
                        </span>
                        <button
                          onClick={() => handleLaunchRfq(msg.text)}
                          className="px-2.5 py-1 text-[11px] font-bold rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center gap-1 cursor-pointer shrink-0 shadow-sm"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Request RFQ</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-900 border border-slate-800 max-w-[140px] text-slate-400 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[10px] text-cyan-300 font-mono">Analyzing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-slate-900/90 border-t border-slate-800 space-y-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about tariffs, MAFF, SFA, FDA, or MOQ..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
                <span>Direct answers grounded in trade regulations (HS 0306.33)</span>
                <button
                  onClick={() => handleLaunchRfq()}
                  className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <span>Full Inquiry Form</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
