'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { supabase, Product, Review } from '@/lib/supabase';
import ReviewList from '@/components/ReviewList';
import ReviewForm from '@/components/ReviewForm';

function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR') + '원';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getStatusStyle(status: string) {
  switch (status) {
    case '예약중':
      return 'bg-green-100 text-green-800';
    case '판매완료':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-primary/10 text-primary';
  }
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', params.id)
      .order('created_at', { ascending: false });
    if (data) setReviews(data);
  };

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(*)')
        .eq('id', params.id)
        .single();

      if (error || !data) {
        router.push('/');
        return;
      }

      setProduct(data);
      setLoading(false);
    }

    if (params.id) {
      fetchProduct();
      fetchReviews();
    }
  }, [params.id, router]);

  const handleDelete = async () => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', params.id);

    if (error) {
      alert('삭제에 실패했습니다.');
      return;
    }
    router.push('/');
  };

  const handleReviewAdded = () => {
    fetchReviews();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* 뒤로가기 */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        뒤로가기
      </button>

      {/* 상품 이미지 */}
      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={product.image_url || 'https://picsum.photos/400/400'}
          alt={product.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 상품 정보 */}
      <div className="mt-6 space-y-4">
        {/* 상태 & 카테고리 */}
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(product.status)}`}>
            {product.status}
          </span>
          {product.categories && (
            <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600">
              {product.categories.name}
            </span>
          )}
        </div>

        {/* 제목 */}
        <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>

        {/* 가격 */}
        <p className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</p>

        {/* 위치 & 시간 */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {product.location}
          </span>
          <span>{formatDate(product.created_at)}</span>
        </div>

        {/* 구분선 */}
        <hr className="border-gray-200" />

        {/* 설명 */}
        <div className="py-4">
          <h2 className="text-lg font-semibold mb-2">상품 설명</h2>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {product.description || '상품 설명이 없습니다.'}
          </p>
        </div>

        {/* 버튼들 */}
        <div className="space-y-3">
          <button
            className="w-full py-4 bg-primary text-white font-semibold rounded-lg hover:bg-secondary transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={product.status === '판매완료'}
          >
            {product.status === '판매완료' ? '판매완료된 상품입니다' : '채팅으로 거래하기'}
          </button>

          <div className="flex gap-3">
            <Link
              href={`/products/${product.id}/edit`}
              className="flex-1 py-3 border border-primary text-primary text-center rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
            >
              수정하기
            </Link>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex-1 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors font-medium"
            >
              삭제하기
            </button>
          </div>
        </div>

        {/* 삭제 확인 모달 */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
              <h3 className="text-lg font-bold mb-2">상품 삭제</h3>
              <p className="text-gray-600 mb-6">정말로 이 상품을 삭제하시겠습니까?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 구분선 */}
        <hr className="border-gray-200 my-8" />

        {/* 리뷰 섹션 */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">상품 후기</h2>
          <ReviewForm productId={product.id} onReviewAdded={handleReviewAdded} />
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
