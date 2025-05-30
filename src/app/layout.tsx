'use client';

import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import { AppBar, Box, Container, CssBaseline, ThemeProvider, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { LocaleProvider } from '@/contexts/LocaleContext';
import LocaleSelector from '@/components/LocaleSelector';

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#2e7d32',
    },
  },
});

export const metadata: Metadata = {
  title: "HODL HODL - P2P Bitcoin Trading Platform",
  description: "Anonymous P2P Bitcoin trading platform. Trade globally using any payment system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <ThemeProvider theme={theme}>
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
            <ThemeRegistry>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </ThemeRegistry>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
