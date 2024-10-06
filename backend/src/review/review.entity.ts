import { Entity } from 'src/shared/database/entity';
import { StorableEntity } from 'src/shared/database/storable-entity.interface';
import { Review } from 'src/shared/types/review.interface';

export class ReviewEntity extends Entity implements StorableEntity<Review> {
  userId: string;
  workoutId: string;
  rating: number;
  text: string;

  constructor(review?: Review) {
    super();
    this.populate(review);
  }

  public populate(review?: Review) {
    if (!review) {
      return;
    }

    this.id = review.id ?? undefined;
    this.userId = review.userId;
    this.workoutId = review.workoutId;
    this.rating = review.rating;
    this.text = review.text;
  }

  public toPOJO(): Review {
    return {
      id: this.id,
      userId: this.userId,
      workoutId: this.workoutId,
      rating: this.rating,
      text: this.text,
    };
  }
}
