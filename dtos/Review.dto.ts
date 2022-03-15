import { BaseDTO } from "./Base.dto";

interface ReviewDTO {
  star: number;
  text: string | null;
  imageUrl?: string;
  videoUrl?: string;
  instrumentId: number;
  userId: number;
}

interface FullReviewDTO extends BaseDTO, ReviewDTO {
  id: number;
}

export {
  ReviewDTO,
  FullReviewDTO
}