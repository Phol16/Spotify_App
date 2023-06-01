import '../globals.css';
import { Varela_Round } from 'next/font/google';

import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import { Providers as RTKProvider } from '@/libs/store/Provider';

const font = Varela_Round({ weight: ['400'], subsets: ['latin'] });

export const metadata = {
  title: 'Spotify App',
  description: 'Generated by Phol',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <Providers>
          <RTKProvider>
            <Navbar />
            {children}
          </RTKProvider>
        </Providers>
      </body>
    </html>
  );
}
