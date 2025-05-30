'use client';

import { Container, Typography, Paper } from '@mui/material';

export default function Privacy() {
  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h3" component="h1" className="mb-6">
        Privacy Policy
      </Typography>

      <Paper className="p-6 space-y-6">
        <section>
          <Typography variant="h5" className="mb-4">
            1. Information We Collect
          </Typography>
          <Typography>
            We collect the following types of information:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>Email address and phone number for account creation and verification</li>
            <li>Trading history and transaction data</li>
            <li>Communication records between users</li>
            <li>Device information and IP addresses</li>
            <li>KYC information for higher trading limits</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            2. How We Use Your Information
          </Typography>
          <Typography>
            We use your information to:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>Facilitate P2P trading</li>
            <li>Verify your identity</li>
            <li>Prevent fraud and abuse</li>
            <li>Improve our services</li>
            <li>Comply with legal requirements</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            3. Information Sharing
          </Typography>
          <Typography>
            We share information only:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>Between trading partners (limited to necessary details)</li>
            <li>With law enforcement when required by law</li>
            <li>With service providers who help operate our platform</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            4. Data Security
          </Typography>
          <Typography>
            We protect your data through:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>Encryption of sensitive information</li>
            <li>Regular security audits</li>
            <li>Secure data storage practices</li>
            <li>Access controls and monitoring</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            5. Your Rights
          </Typography>
          <Typography>
            You have the right to:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>Access your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Object to certain data processing</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            6. Cookies
          </Typography>
          <Typography>
            We use cookies to:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>Maintain your session</li>
            <li>Remember your preferences</li>
            <li>Analyze platform usage</li>
            <li>Improve user experience</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            7. Changes to Privacy Policy
          </Typography>
          <Typography>
            We may update this privacy policy periodically. We will notify you of significant changes via email or platform notifications.
          </Typography>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            8. Contact
          </Typography>
          <Typography>
            For privacy-related inquiries, please contact our Data Protection Officer at privacy@tetherpeer.com.
          </Typography>
        </section>
      </Paper>
    </Container>
  );
} 