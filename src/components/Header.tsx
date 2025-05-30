'use client';

import { AppBar, Toolbar, Button, Container, IconButton, useTheme, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Theme toggle logic will be implemented later
  };

  const menuItems = [
    { label: 'Buy USDT', href: '/buy-usdt' },
    { label: 'Sell USDT', href: '/sell-usdt' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <AppBar position="sticky" color="inherit" elevation={1} className="border-b border-gray-200">
      <Container maxWidth="lg">
        <Toolbar className="flex justify-between py-2">
          <Link href="/" className="no-underline">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-primary">
                TetherPeer
                <span className="text-xs ml-2 text-gray-500">BETA</span>
              </div>
            </div>
          </Link>

          {isMobile ? (
            <>
              <div className="flex items-center gap-2">
                <IconButton
                  color="inherit"
                  onClick={toggleTheme}
                  size="small"
                >
                  {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={handleMobileMenuOpen}
                  size="large"
                >
                  <MenuIcon />
                </IconButton>
              </div>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleMobileMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.href}
                    onClick={handleMobileMenuClose}
                    component={Link}
                    href={item.href}
                  >
                    {item.label}
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={handleMobileMenuClose}
                  component={Link}
                  href="/login"
                >
                  Login
                </MenuItem>
                <MenuItem
                  onClick={handleMobileMenuClose}
                  component={Link}
                  href="/register"
                >
                  Register
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {menuItems.map((item) => (
                <Button
                  key={item.href}
                  color="inherit"
                  href={item.href}
                  className="font-medium"
                >
                  {item.label}
                </Button>
              ))}
              <IconButton
                color="inherit"
                onClick={toggleTheme}
                size="small"
                className="mx-2"
              >
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <Button
                variant="outlined"
                color="primary"
                href="/login"
                className="min-w-[100px]"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                href="/register"
                className="min-w-[100px]"
              >
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
} 