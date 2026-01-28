'use client';

import { Review } from '@/lib/supabase';
import StarRating from './StarRating';

type Props = {
  review: Review;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ReviewCard({ review }: Props) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
            {review.author_name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{review.author_name}</p>
            <p className="text-xs text-gray-500">{formatDate(review.created_at)}</p>
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>
      <p className="text-gray-700 mt-3 leading-relaxed">{review.content}</p>
    </div>
  );
}
