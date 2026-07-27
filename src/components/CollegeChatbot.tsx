import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Sparkles, Bot, User } from 'lucide-react';
import { getAnswer, ChatAnswer } from '@/data/collegesChatEngine';

interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
  suggestions?: string[];
}

const initialMessage: Message = {
  id: 0,
  role: 'bot',
  text: `Hi! I'm the Coimbatore Colleges AI Assistant. I can answer questions about 32 arts and science colleges — courses, fees, placements, admissions, and more. What would you like to know?`,
  suggestions: ['List all colleges', 'Best colleges for B.Sc CS', 'Government colleges', "Women's colleges"],
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: Date.now(), role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const answer: ChatAnswer = getAnswer(trimmed);
      const botMsg: Message = {
        id: Date.now() + 1,
        role: 'bot',
        text: answer.text,
        suggestions: answer.suggestions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-2xl shadow-blue-500/40 transition-all duration-300 hover:scale-110 hover:shadow-blue-500/60 ${
          isOpen ? 'rotate-90' : 'rotate-0'
        }`}
        aria-label="Toggle chatbot"
      >
        {isOpen ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold">
            AI
          </span>
        )}
      </button>

      <div
        className={`fixed bottom-24 right-6 z-50 flex h-[600px] max-h-[calc(100vh-8rem)] w-[400px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 ${
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-8 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-700 to-cyan-600 px-5 py-4 text-white">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Bot className="h-6 w-6" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-blue-700 bg-emerald-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold leading-tight">College AI Assistant</h3>
            <p className="text-xs text-blue-100">Online • 32 colleges • Instant answers</p>
          </div>
          <Sparkles className="h-5 w-5 text-yellow-300" />
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-5">
          {messages.map((msg) => (
            <div key={msg.id}>
              <div className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'bot' && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'rounded-br-sm bg-blue-600 text-white'
                      : 'rounded-bl-sm bg-white text-slate-700'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-300 text-slate-600">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
              {msg.role === 'bot' && msg.suggestions && (
                <div className="mt-2 ml-10 flex flex-wrap gap-2">
                  {msg.suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestion(s)}
                      className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-all hover:bg-blue-600 hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate-200 bg-white px-4 py-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about any college..."
            className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}
