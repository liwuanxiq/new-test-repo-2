import { Controller, Post, Get, Body, Param, Headers } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('companion/session')
  async createSession(@Body() body: { userId?: string }) {
    return this.aiService.createSession(body.userId);
  }

  @Post('companion/chat')
  async chat(
    @Body() body: { sessionId: string; message: string; context?: any },
  ) {
    return this.aiService.chat(body.sessionId, body.message, body.context);
  }

  @Get('recommendations/:userId')
  async getRecommendations(
    @Param('userId') userId: string,
    @Headers() headers: any,
  ) {
    return this.aiService.getPersonalizedRecommendations(userId);
  }

  @Post('review/analyze')
  async analyzeReview(
    @Body() body: { content: string; rating: number; userId: string; purchaseVerified: boolean },
  ) {
    return this.aiService.analyzeReviewAuthenticity(body);
  }

  @Get('trust-score/:entityType/:entityId')
  async getTrustScore(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
  ) {
    const score = await this.aiService.calculateTrustScore(entityType, entityId);
    return { entityType, entityId, score };
  }
}
