'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/supabase';

type Props = {
  product: Product;
};

function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR') + '원';
}

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return '방금 전';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}일 전`;
  return `${Math.floor(diffInSeconds / 2592000)}개월 전`;
}

function getStatusBadge(status: string) {
  switch (status) {
    case '예약중':
      return <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">예약중</span>;
    case '판매완료':
      return <span className="absolute top-2 left-2 bg-gray-500 text-white text-xs px-2 py-1 rounded">판매완료</span>;
    default:
      return null;
  }
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product.id}`} className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        <Image
          src={product.image_url || 'https://picsum.photos/400/400'}
          alt={product.title}
          fill
          className={`object-cover ${product.status === '판매완료' ? 'opacity-50' : ''}`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {getStatusBadge(product.status)}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 truncate">{product.title}</h3>
        <p className="text-base font-bold text-gray-900 mt-1">{formatPrice(product.price)}</p>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>{product.location}</span>
          <span>{formatTimeAgo(product.created_at)}</span>
        </div>
      </div>
    </Link>
  );
}
