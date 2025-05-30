'use client';

import { AppBar, Container, Toolbar, Button, Box } from '@mui/material';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';

export default function Header() {
  const { t } = useLocale();

  const navItems = [
    { label: t('common.buy'), href: '/buy-usdt' },
    { label: t('common.sell'), href: '/sell-usdt' },
    { label: t('common.howItWorks'), href: '/how-it-works' },
    { label: t('common.faq'), href: '/faq' },
    { label: t('common.contact'), href: '/contact' },
  ];

  return (
    <Box component="nav" sx={{ flexGrow: 1, mt: 2 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters className="justify-center">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <Button
                color="inherit"
                sx={{
                  mx: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </Toolbar>
      </Container>
    </Box>
  );
} 