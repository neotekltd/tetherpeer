import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { LocaleProvider } from '@/contexts/LocaleContext';
import dynamic from 'next/dynamic';

const LocaleSelector = dynamic(() => import('@/components/LocaleSelector'), {
  ssr: false
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TetherPeer - P2P USDT Trading Platform",
  description: "Secure P2P USDT trading platform for Tunisia. Trade USDT using local payment methods.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <ThemeRegistry>
          <LocaleProvider>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Container maxWidth="lg">
                  <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                        TetherPeer
                      </Link>
                    </Typography>
                    <LocaleSelector />
                  </Toolbar>
                </Container>
              </AppBar>
            </Box>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </LocaleProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
