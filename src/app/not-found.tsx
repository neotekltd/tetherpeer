import { Container, Typography, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

export default function NotFound() {
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
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The page you are looking for does not exist or has been moved.
        </Typography>
        <Link href="/" passHref>
          <Button variant="contained" color="primary" startIcon={<HomeIcon />}>
            Return Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
} 