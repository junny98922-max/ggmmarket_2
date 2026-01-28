'use client';

import { useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm';

export default function NewProductPage() {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto">
      {/* 뒤로가기 */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        뒤로가기
      </button>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">상품 등록</h1>
        <ProductForm />
      </div>
    </div>
  );
}
