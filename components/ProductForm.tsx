'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, Product, Category } from '@/lib/supabase';

type Props = {
  product?: Product;
  isEdit?: boolean;
};

export default function ProductForm({ product, isEdit = false }: Props) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price?.toString() || '',
    image_url: product?.image_url || '',
    category_id: product?.category_id || '',
    location: product?.location || '',
    status: product?.status || '판매중',
  });

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (data) setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      title: formData.title,
      description: formData.description || null,
      price: parseInt(formData.price),
      image_url: formData.image_url || null,
      category_id: formData.category_id || null,
      location: formData.location || null,
      status: formData.status,
    };

    if (isEdit && product) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', product.id);

      if (error) {
        alert('상품 수정에 실패했습니다.');
        setLoading(false);
        return;
      }
      router.push(`/products/${product.id}`);
    } else {
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();

      if (error) {
        alert('상품 등록에 실패했습니다.');
        setLoading(false);
        return;
      }
      router.push(`/products/${data.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 상품명 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          상품명 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="상품명을 입력하세요"
        />
      </div>

      {/* 가격 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          가격 <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="가격을 입력하세요"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
        </div>
      </div>

      {/* 카테고리 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          카테고리
        </label>
        <select
          value={formData.category_id}
          onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">카테고리 선택</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* 거래 희망 지역 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          거래 희망 지역
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="예: 서울 강남구"
        />
      </div>

      {/* 상품 이미지 URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          상품 이미지 URL
        </label>
        <input
          type="url"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* 상태 (수정 시에만 표시) */}
      {isEdit && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            판매 상태
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as '판매중' | '예약중' | '판매완료' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="판매중">판매중</option>
            <option value="예약중">예약중</option>
            <option value="판매완료">판매완료</option>
          </select>
        </div>
      )}

      {/* 상품 설명 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          상품 설명
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          placeholder="상품에 대해 자세히 설명해주세요"
        />
      </div>

      {/* 버튼 */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-4 bg-primary text-white rounded-lg hover:bg-secondary transition-colors disabled:bg-gray-300"
        >
          {loading ? '처리 중...' : isEdit ? '수정 완료' : '등록하기'}
        </button>
      </div>
    </form>
  );
}
