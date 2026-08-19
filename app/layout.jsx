import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-primary',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  title: 'Luxora Properties | Extraordinary Luxury Living',
  description: "Explore curated collections of the world's most exclusive homes and investment properties.",
  openGraph: {
    title: 'Luxora Properties | Extraordinary Luxury Living',
    description: "Explore curated collections of the world's most exclusive homes and investment properties.",
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={plusJakartaSans.variable}
    >
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
