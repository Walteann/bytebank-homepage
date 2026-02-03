import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/shared/providers/QueryProvider';
import Header from '@/shared/components/layout/Header/Header';
import Footer from '@/shared/components/layout/Footer/Footer';

export const metadata: Metadata = {
  title: 'ByteBank - Sua conta digital',
  description:
    'ByteBank - Experimente mais liberdade no controle da sua vida financeira',
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} antialiased`}>
        <QueryProvider>
          <Header />
          <Suspense fallback={<main className="min-h-screen" />}>
            {children}
          </Suspense>
          <Footer />
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
