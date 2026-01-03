
import './globals.css'
import { Navbar } from "../components/navbar";
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="zh-CN">
      <head />
      <body className="min-h-screen bg-slate-50">
        <Providers>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
        </div>
        </Providers>
      </body>
    </html>
  );
}

