import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/_styles/globals.css';
import Header from '@/components/ui/Header';
import UserRoleProvider from '@/components/ui/UserRoleProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'LMS',
  description: 'Developed By JunaidRao',
  icons: {
    icon: './logo2.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <UserRoleProvider>
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <Header />
            <div className="flex justify-center items-center">{children}</div>
          </body>
        </html>
      </UserRoleProvider>
    </ClerkProvider>
  );
}
