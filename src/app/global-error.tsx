'use client';

import { useEffect } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function GlobalError({
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
    <html>
      <body>
        <Container maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              textAlign: 'center',
              gap: 3,
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Something went wrong!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              A critical error occurred. Please try refreshing the page.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={reset}
              startIcon={<RefreshIcon />}
            >
              Refresh page
            </Button>
          </Box>
        </Container>
      </body>
    </html>
  );
} 