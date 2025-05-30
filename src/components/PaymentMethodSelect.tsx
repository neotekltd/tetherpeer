'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import Image from 'next/image';
import { PaymentMethod } from '@/generated/prisma';

interface PaymentMethodSelectProps {
  onSelect: (method: PaymentMethod, details: { accountNumber: string }) => void;
  selectedMethod?: PaymentMethod;
  error?: string;
}

export default function PaymentMethodSelect({
  onSelect,
  selectedMethod,
  error
}: PaymentMethodSelectProps) {
  const [method, setMethod] = useState<PaymentMethod | null>(selectedMethod || null);
  const [accountNumber, setAccountNumber] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleMethodChange = (_: React.MouseEvent<HTMLElement>, newMethod: PaymentMethod | null) => {
    if (newMethod !== null) {
      setMethod(newMethod);
      setValidationError('');
      setAccountNumber('');
    }
  };

  const validateAccountNumber = (number: string, method: PaymentMethod): boolean => {
    if (method === PaymentMethod.FLOUCI) {
      // Flouci RIB validation (20 digits)
      return /^\d{20}$/.test(number);
    } else {
      // D17 phone number validation (8 digits starting with 2/5/9)
      return /^[259]\d{7}$/.test(number);
    }
  };

  const handleSubmit = () => {
    if (!method) {
      setValidationError('Please select a payment method');
      return;
    }

    if (!validateAccountNumber(accountNumber, method)) {
      setValidationError(
        method === PaymentMethod.FLOUCI
          ? 'Please enter a valid 20-digit RIB number'
          : 'Please enter a valid 8-digit phone number starting with 2, 5, or 9'
      );
      return;
    }

    onSelect(method, { accountNumber });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Select Payment Method
      </Typography>

      <ToggleButtonGroup
        value={method}
        exclusive
        onChange={handleMethodChange}
        aria-label="payment method"
        sx={{ display: 'flex', mb: 3 }}
      >
        <ToggleButton 
          value={PaymentMethod.FLOUCI} 
          aria-label="flouci"
          sx={{ flex: 1, p: 2 }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Image
              src="/images/flouci-logo.svg"
              alt="Flouci"
              width={100}
              height={40}
              style={{ marginBottom: 8 }}
            />
            <Typography>Flouci</Typography>
          </Box>
        </ToggleButton>
        
        <ToggleButton 
          value={PaymentMethod.D17} 
          aria-label="d17"
          sx={{ flex: 1, p: 2 }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Image
              src="/images/d17-logo.svg"
              alt="D17"
              width={100}
              height={40}
              style={{ marginBottom: 8 }}
            />
            <Typography>D17</Typography>
          </Box>
        </ToggleButton>
      </ToggleButtonGroup>

      {method && (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label={method === PaymentMethod.FLOUCI ? 'RIB Number' : 'Phone Number'}
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder={
              method === PaymentMethod.FLOUCI
                ? 'Enter 20-digit RIB number'
                : 'Enter 8-digit phone number'
            }
            error={!!validationError}
            helperText={validationError}
            sx={{ mb: 2 }}
          />
          
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            size="large"
          >
            Confirm Payment Method
          </Button>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Paper>
  );
} 