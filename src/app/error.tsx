'use client';

import { useEffect } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Something went wrong!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {error.message || 'An unexpected error occurred'}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={reset}
          startIcon={<RefreshIcon />}
        >
          Try again
        </Button>
      </Box>
    </Container>
  );
} 