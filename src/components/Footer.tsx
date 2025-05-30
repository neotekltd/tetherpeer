'use client';

import { Container, Grid, Link as MuiLink, Typography, Button } from '@mui/material';
import Link from 'next/link';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12 mt-16">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="mb-4 font-semibold">Platform</Typography>
            <div className="flex flex-col gap-2">
              <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">How It Works</Link>
              <Link href="/fees" className="text-gray-600 hover:text-gray-900">Fees</Link>
              <Link href="/limits" className="text-gray-600 hover:text-gray-900">Trading Limits</Link>
              <Link href="/networks" className="text-gray-600 hover:text-gray-900">Supported Networks</Link>
            </div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="mb-4 font-semibold">Support</Typography>
            <div className="flex flex-col gap-2">
              <Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link>
              <Link href="/guide" className="text-gray-600 hover:text-gray-900">User Guide</Link>
              <Link href="/security" className="text-gray-600 hover:text-gray-900">Security</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact Support</Link>
            </div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="mb-4 font-semibold">Legal</Typography>
            <div className="flex flex-col gap-2">
              <Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link>
              <Link href="/aml" className="text-gray-600 hover:text-gray-900">AML Policy</Link>
              <Link href="/dispute" className="text-gray-600 hover:text-gray-900">Dispute Resolution</Link>
            </div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="mb-4 font-semibold">Community</Typography>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Button
                  startIcon={<TelegramIcon />}
                  variant="outlined"
                  color="primary"
                  href="https://t.me/TetherPeer"
                  target="_blank"
                  fullWidth
                  size="small"
                >
                  Telegram
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  startIcon={<WhatsAppIcon />}
                  variant="outlined"
                  color="primary"
                  href="https://wa.me/TetherPeer"
                  target="_blank"
                  fullWidth
                  size="small"
                >
                  WhatsApp
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  startIcon={<TwitterIcon />}
                  variant="outlined"
                  color="primary"
                  href="https://twitter.com/TetherPeer"
                  target="_blank"
                  fullWidth
                  size="small"
                >
                  Twitter
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Typography variant="body2" color="textSecondary" align="center">
            © {new Date().getFullYear()} TetherPeer. All rights reserved.
            <br />
            <span className="text-xs mt-2 block text-gray-500">
              TetherPeer is a non-custodial P2P USDT exchange platform. We never hold your funds.
            </span>
          </Typography>
        </div>
      </Container>
    </footer>
  );
} 