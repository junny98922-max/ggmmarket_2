import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: '고구마마켓 - 중고거래',
  description: '우리 동네 중고 직거래 마켓',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <header className="bg-gradient-to-r from-primary to-secondary shadow-lg sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-white flex items-center gap-2 hover:opacity-90 transition-opacity">
              🌊 고구마마켓
            </Link>
            <Link
              href="/products/new"
              className="bg-white text-primary px-4 py-2 rounded-lg font-medium hover:bg-accent hover:text-white transition-colors shadow-md"
            >
              + 상품 등록
            </Link>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
