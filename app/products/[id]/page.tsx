'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase, Product } from '@/lib/supabase';

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
  const [loading, setLoading] = useState(true);

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
    }
  }, [params.id, router]);

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

        {/* 채팅 버튼 */}
        <button
          className="w-full py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={product.status === '판매완료'}
        >
          {product.status === '판매완료' ? '판매완료된 상품입니다' : '채팅으로 거래하기'}
        </button>
      </div>
    </div>
  );
}
