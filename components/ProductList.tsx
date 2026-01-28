'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { supabase, Product, Category } from '@/lib/supabase';
import { getAdByIndex } from '@/lib/ads';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import AdBanner from './AdBanner';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 카테고리 로드
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

  // 상품 로드
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      let query = supabase
        .from('products')
        .select('*, categories(*)')
        .order('created_at', { ascending: false });

      // 검색어 필터
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      // 카테고리 필터
      if (selectedCategory) {
        const category = categories.find(c => c.slug === selectedCategory);
        if (category) {
          query = query.eq('category_id', category.id);
        }
      }

      const { data } = await query;
      if (data) setProducts(data);
      setLoading(false);
    }

    fetchProducts();
  }, [searchQuery, selectedCategory, categories]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategorySelect = useCallback((slug: string | null) => {
    setSelectedCategory(slug);
  }, []);

  return (
    <div className="space-y-4">
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>상품이 없습니다</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <React.Fragment key={product.id}>
              {index > 0 && index % 4 === 0 && (
                <AdBanner ad={getAdByIndex(index / 4 - 1)} />
              )}
              <ProductCard product={product} />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
