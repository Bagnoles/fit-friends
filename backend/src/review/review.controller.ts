import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { InjectUserIdInterceptor } from 'src/shared/interceptors/inject-user-id.interceptor';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/:workoutId')
  public async index(@Param('workoutId') workoutId: string) {
    const result = await this.reviewService.getReviews(workoutId);
    return result;
  }

  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreateReviewDto) {
    const result = await this.reviewService.addReview(dto);
    return result;
  }
}
