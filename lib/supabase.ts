import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Category = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type Product = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
  location: string | null;
  status: '판매중' | '예약중' | '판매완료';
  created_at: string;
  updated_at: string;
  categories?: Category;
};
