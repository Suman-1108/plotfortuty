import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'AP Rajan Garden | Plot 4 Tuty — Beachside Plots & Turnkey House Construction in Thoothukudi',
  description:
    'Discover DTCP-approved residential plots and turnkey house construction at AP Rajan Garden in Tharuvaikulam, Thoothukudi, Tamil Nadu. Walking distance to beach, 33ft roads, sweet groundwater, and up to 90% loan financing.',
  keywords: [
    'AP Rajan Garden',
    'Tharuvaikulam plots',
    'Thoothukudi residential plots',
    'Beachside plots Tuticorin',
    'DTCP approved plots Thoothukudi',
    'ECR road plots Thoothukudi',
    'Turnkey house construction Tuticorin',
    'Plot 4 Tuty',
    'Tamil Nadu beachside land for sale',
  ],
  authors: [{ name: 'Plot 4 Tuty' }],
  metadataBase: new URL('https://plot4tuty.com'),
  icons: {
    icon: '/logo-round.png',
    apple: '/logo-round.png',
  },
  openGraph: {
    title: 'PLOT 4 TUTY — Find Your Land. Build Your Future.',
    description: 'Verified DTCP Approved residential plots in Thoothukudi, Tamil Nadu.',
    url: 'https://plot4tuty.com',
    siteName: 'Plot 4 Tuty',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'PLOT 4 TUTY Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#F4F5F0] text-[#222222] antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
