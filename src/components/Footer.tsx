'use client';

import { Container, Grid, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';

export default function Footer() {
  const { t } = useLocale();

  const footerSections = [
    {
      title: 'TetherPeer',
      links: [
        { label: t('common.buy'), href: '/buy-usdt' },
        { label: t('common.sell'), href: '/sell-usdt' },
        { label: t('common.howItWorks'), href: '/how-it-works' },
        { label: t('common.faq'), href: '/faq' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: t('common.contact'), href: '/contact' },
        { label: 'Twitter', href: 'https://twitter.com/tetherpeer' },
        { label: 'Telegram', href: 'https://t.me/tetherpeer' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'AML Policy', href: '/aml' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 py-12 mt-12">
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {footerSections.map((section) => (
            <Grid item xs={12} sm={4} key={section.title}>
              <Typography variant="h6" className="mb-4">
                {section.title}
              </Typography>
              <ul className="space-y-2 list-none p-0">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith('http') ? (
                      <MuiLink
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="inherit"
                        underline="hover"
                      >
                        {link.label}
                      </MuiLink>
                    ) : (
                      <Link href={link.href} passHref>
                        <MuiLink color="inherit" underline="hover">
                          {link.label}
                        </MuiLink>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          className="mt-8 pt-8 border-t"
        >
          © {new Date().getFullYear()} TetherPeer. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
} 