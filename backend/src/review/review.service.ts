import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { ReviewEntity } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  public async getReviews(workoutId: string) {
    return await this.reviewRepository.findAllByWorkoutId(workoutId);
  }

  public async addReview(dto: CreateReviewDto) {
    const newReview = new ReviewEntity(dto);
    const result = await this.reviewRepository.save(newReview);
    return result;
  }
}
