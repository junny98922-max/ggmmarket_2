import type { Metadata } from 'next';
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
      <body className="bg-gray-50 min-h-screen">
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-primary">🍠 고구마마켓</h1>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
