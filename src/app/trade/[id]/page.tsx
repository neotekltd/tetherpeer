'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  Box, 
  Container, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { TradeStatus, PaymentMethod, Network } from '@/generated/prisma';

interface TradeDetails {
  id: string;
  escrowAddress: string;
  network: Network;
  amount: number;
  priceInTND: number;
  totalTND: number;
  status: TradeStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  expiresAt: string;
  seller: {
    email: string;
    rating: number;
  };
  buyer?: {
    email: string;
    rating: number;
  };
}

const steps = [
  'Trade Created',
  'USDT Locked in Escrow',
  'Payment Pending',
  'Payment Sent',
  'Payment Confirmed',
  'USDT Released'
];

const statusToStep = {
  [TradeStatus.CREATED]: 0,
  [TradeStatus.ESCROW_FUNDED]: 1,
  [TradeStatus.PAYMENT_PENDING]: 2,
  [TradeStatus.PAYMENT_SENT]: 3,
  [TradeStatus.PAYMENT_CONFIRMED]: 4,
  [TradeStatus.COMPLETED]: 5,
  [TradeStatus.DISPUTED]: 2,
  [TradeStatus.REFUNDED]: 0,
  [TradeStatus.CANCELLED]: 0,
};

export default function TradePage() {
  const { id } = useParams();
  const [trade, setTrade] = useState<TradeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTradeDetails = async () => {
      try {
        const response = await fetch(`/api/trade/${id}`);
        if (!response.ok) throw new Error('Failed to fetch trade details');
        const data = await response.json();
        setTrade(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTradeDetails();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!trade) return <Alert severity="warning">Trade not found</Alert>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Trade Details
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Stepper activeStep={statusToStep[trade.status]} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Trade Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography><strong>Amount:</strong> {trade.amount} USDT</Typography>
              <Typography><strong>Network:</strong> {trade.network}</Typography>
              <Typography><strong>Price:</strong> {trade.priceInTND} TND/USDT</Typography>
              <Typography><strong>Total:</strong> {trade.totalTND} TND</Typography>
              <Typography><strong>Payment Method:</strong> {trade.paymentMethod}</Typography>
              <Typography><strong>Created:</strong> {new Date(trade.createdAt).toLocaleString()}</Typography>
              <Typography><strong>Expires:</strong> {new Date(trade.expiresAt).toLocaleString()}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Escrow Details
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography><strong>Status:</strong> {trade.status}</Typography>
              <Typography
                sx={{
                  wordBreak: 'break-all',
                  fontFamily: 'monospace',
                  bgcolor: 'grey.100',
                  p: 1,
                  borderRadius: 1,
                  mt: 1
                }}
              >
                <strong>Escrow Address:</strong><br />
                {trade.escrowAddress}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Participants
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography>
                <strong>Seller:</strong> {trade.seller.email} (Rating: {trade.seller.rating}/5)
              </Typography>
              {trade.buyer && (
                <Typography>
                  <strong>Buyer:</strong> {trade.buyer.email} (Rating: {trade.buyer.rating}/5)
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Action buttons based on trade status */}
      <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
        {trade.status === TradeStatus.PAYMENT_SENT && (
          <Button variant="contained" color="success">
            Confirm Payment Received
          </Button>
        )}
        {trade.status !== TradeStatus.COMPLETED && trade.status !== TradeStatus.CANCELLED && (
          <Button variant="contained" color="error">
            Open Dispute
          </Button>
        )}
      </Box>
    </Container>
  );
} 