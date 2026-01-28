'use client';

import { Category } from '@/lib/supabase';

type Props = {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
};

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
          selectedCategory === null
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        전체
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.slug)}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
            selectedCategory === category.slug
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
