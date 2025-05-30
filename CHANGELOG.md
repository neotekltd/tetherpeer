# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2024-02-20

### Added
- P2P trading functionality:
  - Multisig escrow system with 2-of-3 signatures
  - Support for TRC20, ERC20, and Polygon USDT
  - Trade status tracking and management
  - Automatic refund after 24 hours
- Payment integrations:
  - Flouci payment gateway with RIB validation
  - D17 mobile money with SMS verification
  - Payment status webhooks
- User management:
  - Email-only signup with 500 TND daily limit
  - Phone verification for 5,000 TND limit
  - User ratings and dispute system
- Security features:
  - Client-side key generation
  - E2E encrypted chat
  - Payment proof sharing
  - Device fingerprinting
- Blockchain integrations:
  - TronWeb for TRC20 USDT
  - Ethers.js for ERC20/Polygon USDT
  - Multi-signature transaction support
  - Cross-chain balance tracking

### Dependencies
- Added bitcoinjs-lib 6.1.5
- Added ecpair 2.1.0
- Added tiny-secp256k1 2.2.3
- Added tronweb 5.3.1

## [0.1.0] - 2024-02-20

### Added
- Initial project setup with Next.js 14.1.0
- Material-UI integration with custom theme
- Responsive layout with Tailwind CSS
- Homepage components:
  - Header with navigation
  - Hero section with Bitcoin illustration
  - Trading form section
  - Features highlighting privacy and security
  - Getting started steps
  - FAQ section
  - Featured logos section
  - Footer with navigation links
- Client-side components:
  - ThemeRegistry for Material-UI
  - Header component
  - Footer component
  - Home page
- SVG assets:
  - Bitcoin illustration
  - Featured company logos (CNN, Yahoo Finance, Coindesk, Bloomberg, Bitcoin Magazine)
- Basic project configuration:
  - TypeScript support
  - ESLint configuration
  - Tailwind CSS setup
  - Next.js configuration
  - Git repository setup

### Fixed
- Server-side rendering issues with Material-UI components
- Theme creation moved to client-side
- Component architecture aligned with Next.js 13+ App Router best practices

### Dependencies
- Next.js 14.1.0
- React 18.2.0
- Material-UI 5.15.10
- Tailwind CSS 3.4.1
- TypeScript 5.3.3
- ESLint 8.56.0 