'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import StarRating from './StarRating';

type Props = {
  productId: string;
  onReviewAdded: () => void;
};

export default function ReviewForm({ productId, onReviewAdded }: Props) {
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('reviews').insert({
      product_id: productId,
      author_name: authorName,
      rating,
      content,
    });

    if (error) {
      alert('후기 등록에 실패했습니다.');
      setLoading(false);
      return;
    }

    setAuthorName('');
    setRating(5);
    setContent('');
    setIsOpen(false);
    setLoading(false);
    onReviewAdded();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 border-2 border-dashed border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
      >
        + 후기 작성하기
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">후기 작성</h3>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="닉네임을 입력하세요"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">별점</label>
        <StarRating rating={rating} size="lg" interactive onChange={setRating} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">후기 내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          placeholder="상품에 대한 솔직한 후기를 남겨주세요"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors disabled:bg-gray-300 font-medium"
      >
        {loading ? '등록 중...' : '후기 등록'}
      </button>
    </form>
  );
}
