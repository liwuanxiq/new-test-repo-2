import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface AICompanionMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ProductContext {
  id: string;
  name: string;
  price: number;
  category?: string;
}

interface ShoppingSession {
  sessionId: string;
  userId?: string;
  messages: AICompanionMessage[];
  context: {
    currentPage?: string;
    recentViews?: string[];
    cartItems?: ProductContext[];
    preferences?: any;
  };
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private sessions: Map<string, ShoppingSession> = new Map();
  
  constructor(private configService: ConfigService) {}

  /**
   * Create a new AI shopping companion session
   */
  async createSession(userId?: string): Promise<{ sessionId: string }> {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const session: ShoppingSession = {
      sessionId,
      userId,
      messages: [
        {
          role: 'system',
          content: `You are Aura, an intelligent AI shopping companion for a next-generation e-commerce platform. 
          
Your capabilities:
- Help users find products based on their needs, preferences, and budget
- Provide personalized recommendations with clear reasoning
- Compare products conversationally, highlighting tradeoffs
- Detect user emotions and adapt your tone accordingly
- Explain why products fit their lifestyle
- Predict potential regrets before purchase
- Answer questions about product features, quality, and suitability
- Suggest alternatives when needed

Personality traits:
- Friendly, helpful, and knowledgeable
- Honest about product limitations
- Focus on long-term value, not just sales
- Adapt to user's communication style
- Use emojis sparingly but warmly

Always be transparent about your reasoning and help users make informed decisions.`,
        },
      ],
      context: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.sessions.set(sessionId, session);
    this.logger.log(`Created AI session: ${sessionId}`);

    return { sessionId };
  }

  /**
   * Process a chat message and generate AI response
   */
  async chat(
    sessionId: string,
    message: string,
    context?: any,
  ): Promise<{
    response: string;
    metadata?: {
      intent?: string;
      emotion?: string;
      suggestions?: string[];
      products?: string[];
      confidence?: number;
    };
  }> {
    const session = this.sessions.get(sessionId);
    
    if (!session) {
      throw new Error('Session not found');
    }

    // Add user message to history
    session.messages.push({
      role: 'user',
      content: message,
    });

    // Update context
    if (context) {
      session.context = { ...session.context, ...context };
    }

    session.updatedAt = new Date();

    // Analyze intent and emotion
    const analysis = await this.analyzeMessage(message, session.context);
    
    // Generate response (in production, this would call an LLM API)
    const response = await this.generateResponse(message, analysis, session);

    // Add assistant response to history
    session.messages.push({
      role: 'assistant',
      content: response,
    });

    // Keep only last 20 messages to manage token usage
    if (session.messages.length > 20) {
      session.messages = [session.messages[0], ...session.messages.slice(-19)];
    }

    this.sessions.set(sessionId, session);

    return {
      response,
      metadata: {
        intent: analysis.intent,
        emotion: analysis.emotion,
        suggestions: analysis.suggestions,
        products: analysis.products,
        confidence: analysis.confidence,
      },
    };
  }

  /**
   * Analyze user message for intent and emotion
   */
  private async analyzeMessage(message: string, context: any) {
    const lowerMessage = message.toLowerCase();
    
    // Intent detection (simplified - use ML in production)
    let intent = 'general_inquiry';
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      intent = 'request_recommendation';
    } else if (lowerMessage.includes('compare')) {
      intent = 'product_comparison';
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cheap') || lowerMessage.includes('expensive')) {
      intent = 'price_inquiry';
    } else if (lowerMessage.includes('quality') || lowerMessage.includes('durable') || lowerMessage.includes('best')) {
      intent = 'quality_assessment';
    } else if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
      intent = 'policy_inquiry';
    } else if (lowerMessage.includes('shipping') || lowerMessage.includes('deliver')) {
      intent = 'shipping_inquiry';
    } else if (lowerMessage.includes('buy') || lowerMessage.includes('purchase') || lowerMessage.includes('add to cart')) {
      intent = 'purchase_intent';
    }

    // Emotion detection (simplified - use sentiment analysis in production)
    let emotion = 'neutral';
    if (lowerMessage.includes('love') || lowerMessage.includes('amazing') || lowerMessage.includes('great') || lowerMessage.includes('!')) {
      emotion = 'excited';
    } else if (lowerMessage.includes('hate') || lowerMessage.includes('terrible') || lowerMessage.includes('worst')) {
      emotion = 'frustrated';
    } else if (lowerMessage.includes('confused') || lowerMessage.includes('unsure') || lowerMessage.includes('?')) {
      emotion = 'uncertain';
    } else if (lowerMessage.includes('need') || lowerMessage.includes('must') || lowerMessage.includes('urgent')) {
      emotion = 'urgent';
    }

    // Generate smart suggestions based on intent
    const suggestions: string[] = [];
    if (intent === 'request_recommendation') {
      suggestions.push('Show me budget options', 'What\'s most popular?', 'Compare top picks');
    } else if (intent === 'product_comparison') {
      suggestions.push('Show differences', 'Which is better value?', 'Pros and cons');
    } else if (intent === 'price_inquiry') {
      suggestions.push('Show deals', 'Price history', 'Alert me on price drop');
    }

    // Extract product mentions (simplified - use NER in production)
    const products: string[] = [];
    
    return {
      intent,
      emotion,
      suggestions,
      products,
      confidence: 0.85, // Would be calculated by ML model
    };
  }

  /**
   * Generate contextual response based on analysis
   */
  private async generateResponse(
    message: string,
    analysis: any,
    session: ShoppingSession,
  ): Promise<string> {
    const { intent, emotion } = analysis;

    // Adapt tone based on emotion
    const tonePrefix = emotion === 'frustrated' 
      ? "I understand your concern. " 
      : emotion === 'uncertain'
      ? "Let me help clarify things. "
      : emotion === 'excited'
      ? "That's great! "
      : "";

    // Generate response based on intent
    switch (intent) {
      case 'request_recommendation':
        return `${tonePrefix}Based on what you've told me, I'd recommend considering a few options. To give you the best suggestion, could you tell me more about:\n\n• Your budget range?\n• How you plan to use it?\n• Any specific features that matter most to you?\n\nThis will help me narrow down to products that truly fit your needs! 🎯`;

      case 'product_comparison':
        return `${tonePrefix}Great question! When comparing products, I look at several factors:\n\n1. **Value for money** - Not just price, but long-term cost per use\n2. **Quality & durability** - Materials, build quality, warranty\n3. **User satisfaction** - Verified reviews and ratings\n4. **Feature match** - What you actually need vs nice-to-haves\n\nWhich specific products would you like me to compare?`;

      case 'price_inquiry':
        return `${tonePrefix}I can definitely help with pricing! Here's what I can tell you:\n\n• Current price and any active discounts\n• Price history trends\n• Whether it's a good time to buy\n• Alternative options in different price ranges\n\nWhat's your budget range? I'll find the best options within it! 💰`;

      case 'quality_assessment':
        return `${tonePrefix}Quality is so important! Here's how I evaluate products:\n\n✅ **Materials** - Premium components that last\n✅ **Craftsmanship** - Attention to detail in construction\n✅ **Brand reputation** - Track record of quality\n✅ **Warranty** - Confidence in longevity\n✅ **Real user feedback** - Long-term satisfaction\n\nWhat type of product are you considering?`;

      case 'purchase_intent':
        return `${tonePrefix}Ready to make a decision? Before you do, let me quickly confirm:\n\n✓ This fits your stated preferences\n✓ It's within your budget\n✓ The reviews support your use case\n✓ Return policy protects your purchase\n\nIf all checks out, go for it! Want me to add it to your cart? 🛒`;

      default:
        return `${tonePrefix}I'm here to help you find exactly what you're looking for! Whether you need:\n\n🔍 Product recommendations\n⚖️ Comparisons between options\n💡 Expert insights on quality\n💰 Budget-friendly alternatives\n\nJust let me know what you're shopping for today!`;
    }
  }

  /**
   * Get personalized recommendations based on user behavior
   */
  async getPersonalizedRecommendations(
    userId: string,
    limit: number = 10,
    context?: any,
  ): Promise<any[]> {
    // In production, this would query vector database and ML models
    this.logger.log(`Generating personalized recommendations for user ${userId}`);
    
    return [];
  }

  /**
   * Analyze review authenticity using AI
   */
  async analyzeReviewAuthenticity(review: {
    content: string;
    rating: number;
    userId: string;
    purchaseVerified: boolean;
  }): Promise<{
    authenticityScore: number;
    flags: string[];
    confidence: number;
  }> {
    // In production, use NLP models to detect fake reviews
    const score = review.purchaseVerified ? 95 : 70;
    const flags: string[] = [];

    if (!review.purchaseVerified) {
      flags.push('unverified_purchase');
    }

    if (review.content.length < 20) {
      flags.push('very_short_review');
    }

    return {
      authenticityScore: score,
      flags,
      confidence: 0.9,
    };
  }

  /**
   * Calculate trust score for product/seller
   */
  async calculateTrustScore(entityType: string, entityId: string): Promise<number> {
    // In production, aggregate multiple trust signals
    return Math.floor(Math.random() * 20) + 80; // Placeholder
  }
}
