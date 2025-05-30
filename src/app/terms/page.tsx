'use client';

import { Container, Typography, Paper } from '@mui/material';

export default function Terms() {
  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h3" component="h1" className="mb-6">
        Terms of Service
      </Typography>

      <Paper className="p-6 space-y-6">
        <section>
          <Typography variant="h5" className="mb-4">
            1. Introduction
          </Typography>
          <Typography>
            Welcome to TetherPeer. By using our platform, you agree to these terms of service. TetherPeer is a non-custodial P2P USDT trading platform that facilitates transactions between users in Tunisia.
          </Typography>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            2. Services
          </Typography>
          <Typography>
            TetherPeer provides a platform for users to:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>Buy and sell USDT using local payment methods</li>
            <li>Create and respond to trading offers</li>
            <li>Use our escrow service for secure transactions</li>
            <li>Access trading tools and information</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            3. User Obligations
          </Typography>
          <Typography>
            Users must:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>Be at least 18 years old</li>
            <li>Provide accurate information during registration</li>
            <li>Maintain the security of their account</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not engage in fraudulent activities</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            4. Trading Rules
          </Typography>
          <Typography>
            All trades must:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>Use the platform's escrow service</li>
            <li>Be completed within the specified timeframe</li>
            <li>Follow the dispute resolution process if issues arise</li>
            <li>Comply with our AML/KYC policies</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            5. Fees
          </Typography>
          <Typography>
            TetherPeer charges a 0.5% fee on completed trades. Network fees for USDT transfers are paid by users. Payment processing fees may apply depending on the payment method used.
          </Typography>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            6. Limitations of Liability
          </Typography>
          <Typography>
            TetherPeer is not responsible for:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>User errors in sending funds</li>
            <li>Network delays or failures</li>
            <li>Issues with third-party payment providers</li>
            <li>Loss of funds due to compromised user accounts</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            7. Changes to Terms
          </Typography>
          <Typography>
            We may modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.
          </Typography>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            8. Contact
          </Typography>
          <Typography>
            For questions about these terms, please contact us at support@tetherpeer.com.
          </Typography>
        </section>
      </Paper>
    </Container>
  );
} 