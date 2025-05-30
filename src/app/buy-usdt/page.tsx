'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Button,
  Box,
  Chip,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';

// Mock data for offers
const mockOffers = [
  {
    id: 1,
    seller: 'TunexPro',
    price: 3.25,
    available: 5000,
    minAmount: 100,
    maxAmount: 5000,
    paymentMethod: 'flouci',
    network: 'trc20',
    completedTrades: 156,
    successRate: 99.2,
    verified: true,
  },
  {
    id: 2,
    seller: 'DinarKing',
    price: 3.27,
    available: 3000,
    minAmount: 200,
    maxAmount: 3000,
    paymentMethod: 'd17',
    network: 'trc20',
    completedTrades: 89,
    successRate: 98.5,
    verified: true,
  },
  {
    id: 3,
    seller: 'CryptoTN',
    price: 3.28,
    available: 2000,
    minAmount: 100,
    maxAmount: 2000,
    paymentMethod: 'flouci',
    network: 'polygon',
    completedTrades: 45,
    successRate: 97.8,
    verified: false,
  },
];

export default function BuyUSDT() {
  const { t, formatCurrency } = useLocale();
  const [network, setNetwork] = useState('all');
  const [paymentMethod, setPaymentMethod] = useState('all');
  const [amount, setAmount] = useState('');

  return (
    <Container maxWidth="lg" className="py-8">
      {/* Page Header */}
      <Typography variant="h4" component="h1" className="mb-6">
        {t('buy.title')}
      </Typography>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label={t('common.network')}
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
              >
                <MenuItem value="all">{t('common.allNetworks')}</MenuItem>
                <MenuItem value="trc20">TRC20 (TRON)</MenuItem>
                <MenuItem value="erc20">ERC20 (Ethereum)</MenuItem>
                <MenuItem value="polygon">Polygon</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label={t('common.paymentMethod')}
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="all">{t('common.allMethods')}</MenuItem>
                <MenuItem value="flouci">Flouci</MenuItem>
                <MenuItem value="d17">D17</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label={t('common.amount')}
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                InputProps={{
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Offers List */}
      <div className="space-y-4">
        {mockOffers.map((offer) => (
          <Card key={offer.id} className="border border-gray-200">
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <div className="flex items-center mb-2">
                    <Typography variant="h6" component="span" className="mr-2">
                      {offer.seller}
                    </Typography>
                    {offer.verified && (
                      <VerifiedUserIcon color="primary" fontSize="small" title={t('common.verified')} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {offer.completedTrades} {t('common.trades')} • {offer.successRate}% {t('common.success')}
                  </div>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <div className="space-y-2">
                    <div>
                      <Typography variant="h6" color="primary">
                        {formatCurrency(offer.price, 'TND')}/USDT
                      </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                      {offer.paymentMethod === 'flouci' ? (
                        <AccountBalanceIcon fontSize="small" />
                      ) : (
                        <PhoneAndroidIcon fontSize="small" />
                      )}
                      <span className="capitalize">{offer.paymentMethod}</span>
                    </div>
                    <Chip 
                      label={offer.network.toUpperCase()} 
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </div>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <div className="text-right">
                    <div className="mb-2">
                      <Typography variant="body2" color="textSecondary">
                        {t('common.available')}
                      </Typography>
                      <Typography variant="h6">
                        {formatCurrency(offer.available, 'USDT')}
                      </Typography>
                    </div>
                    <div className="mb-4">
                      <Typography variant="body2" color="textSecondary">
                        {t('common.limits')}
                      </Typography>
                      <Typography variant="body2">
                        {formatCurrency(offer.minAmount, 'USDT')} - {formatCurrency(offer.maxAmount, 'USDT')}
                      </Typography>
                    </div>
                    <Link href={`/trade/${offer.id}`}>
                      <Button variant="contained" color="primary" fullWidth>
                        {t('common.buy')} USDT
                      </Button>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
} 