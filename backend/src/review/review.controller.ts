import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectUserIdInterceptor } from 'src/shared/interceptors/inject-user-id.interceptor';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { fillDto } from 'src/shared/utils/common';
import { ReviewRdo } from './rdo/review.rdo';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:workoutId')
  public async index(@Param('workoutId') workoutId: string) {
    const result = await this.reviewService.getReviews(workoutId);
    return fillDto(
      ReviewRdo,
      result.map((item) => item.toPOJO()),
    );
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreateReviewDto) {
    const result = await this.reviewService.addReview(dto);
    return fillDto(ReviewRdo, result);
  }
}
