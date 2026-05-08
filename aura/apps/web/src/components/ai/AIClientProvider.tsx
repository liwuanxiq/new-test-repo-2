'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface AICompanionContextType {
  isConnected: boolean;
  isTyping: boolean;
  sessionId: string | null;
  sendMessage: (message: string) => Promise<void>;
  messages: Message[];
  clearMessages: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    products?: string[];
    intent?: string;
    emotion?: string;
    suggestions?: string[];
  };
}

const AICompanionContext = createContext<AICompanionContextType | undefined>(undefined);

export function AIClientProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Initialize AI companion session
    initializeSession();
  }, []);

  async function initializeSession() {
    try {
      const response = await fetch('/api/ai/companion/session', {
        method: 'POST',
      });
      const data = await response.json();
      setSessionId(data.sessionId);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to initialize AI session:', error);
    }
  }

  async function sendMessage(content: string) {
    if (!sessionId) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/companion/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: content,
          context: {
            currentPage: window.location.pathname,
            recentViews: getRecentProductViews(),
          },
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        metadata: data.metadata,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsTyping(false);
    }
  }

  function clearMessages() {
    setMessages([]);
  }

  function getRecentProductViews(): string[] {
    // Get recently viewed products from localStorage
    try {
      const views = localStorage.getItem('recent_views');
      return views ? JSON.parse(views) : [];
    } catch {
      return [];
    }
  }

  return (
    <AICompanionContext.Provider
      value={{
        isConnected,
        isTyping,
        sessionId,
        sendMessage,
        messages,
        clearMessages,
      }}
    >
      {children}
    </AICompanionContext.Provider>
  );
}

export function useAICompanion() {
  const context = useContext(AICompanionContext);
  if (context === undefined) {
    throw new Error('useAICompanion must be used within an AIClientProvider');
  }
  return context;
}
