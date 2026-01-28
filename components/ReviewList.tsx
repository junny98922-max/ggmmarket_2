'use client';

import { Review } from '@/lib/supabase';
import ReviewCard from './ReviewCard';
import StarRating from './StarRating';

type Props = {
  reviews: Review[];
};

export default function ReviewList({ reviews }: Props) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>아직 후기가 없습니다.</p>
        <p className="text-sm mt-1">첫 번째 후기를 남겨보세요!</p>
      </div>
    );
  }

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="space-y-4">
      {/* 평균 별점 */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 flex items-center gap-4">
        <div className="text-3xl font-bold text-gray-900">
          {averageRating.toFixed(1)}
        </div>
        <div>
          <StarRating rating={Math.round(averageRating)} size="md" />
          <p className="text-sm text-gray-500 mt-1">{reviews.length}개의 후기</p>
        </div>
      </div>

      {/* 후기 목록 */}
      <div className="space-y-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
