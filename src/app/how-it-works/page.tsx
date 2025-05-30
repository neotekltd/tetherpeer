'use client';

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Button,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SecurityIcon from '@mui/icons-material/Security';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';

export default function HowItWorks() {
  const { t } = useLocale();

  return (
    <Container maxWidth="lg" className="py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <Typography variant="h3" component="h1" className="mb-4">
          {t('howItWorks.title')}
        </Typography>
        <Typography variant="h6" color="textSecondary" className="mb-8">
          {t('howItWorks.subtitle')}
        </Typography>
      </div>

      {/* Trading Steps */}
      <Grid container spacing={4} className="mb-16">
        <Grid item xs={12} md={4}>
          <Card className="h-full">
            <CardContent className="text-center p-6">
              <Box className="mb-4">
                <AccountBalanceWalletIcon color="primary" sx={{ fontSize: 48 }} />
              </Box>
              <Typography variant="h5" className="mb-3">
                {t('howItWorks.step1.title')}
              </Typography>
              <Typography color="textSecondary">
                {t('howItWorks.step1.description')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="h-full">
            <CardContent className="text-center p-6">
              <Box className="mb-4">
                <SwapHorizIcon color="primary" sx={{ fontSize: 48 }} />
              </Box>
              <Typography variant="h5" className="mb-3">
                {t('howItWorks.step2.title')}
              </Typography>
              <Typography color="textSecondary">
                {t('howItWorks.step2.description')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="h-full">
            <CardContent className="text-center p-6">
              <Box className="mb-4">
                <SecurityIcon color="primary" sx={{ fontSize: 48 }} />
              </Box>
              <Typography variant="h5" className="mb-3">
                {t('howItWorks.step3.title')}
              </Typography>
              <Typography color="textSecondary">
                {t('howItWorks.step3.description')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Getting Started CTA */}
      <Card className="bg-primary-50">
        <CardContent className="text-center py-8">
          <Typography variant="h5" className="mb-4">
            {t('howItWorks.cta.title')}
          </Typography>
          <Typography className="mb-6">
            {t('howItWorks.cta.subtitle')}
          </Typography>
          <div className="flex justify-center gap-4">
            <Link href="/buy-usdt">
              <Button variant="contained" color="primary" size="large">
                {t('common.buy')} USDT
              </Button>
            </Link>
            <Link href="/sell-usdt">
              <Button variant="outlined" color="primary" size="large">
                {t('common.sell')} USDT
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
} 