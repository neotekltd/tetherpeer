'use client';

import { Container, Typography, Paper } from '@mui/material';

export default function AML() {
  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h3" component="h1" className="mb-6">
        Anti-Money Laundering Policy
      </Typography>

      <Paper className="p-6 space-y-6">
        <section>
          <Typography variant="h5" className="mb-4">
            1. Introduction
          </Typography>
          <Typography>
            TetherPeer is committed to preventing money laundering and any activity that facilitates money laundering or funding of terrorist or criminal activities. This policy outlines our procedures to prevent, detect and report suspicious activities.
          </Typography>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            2. Compliance Program
          </Typography>
          <Typography>
            Our AML compliance program includes:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>Written policies and procedures</li>
            <li>A designated AML Compliance Officer</li>
            <li>Regular employee training</li>
            <li>Independent testing of AML procedures</li>
            <li>Customer due diligence procedures</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            3. Verification Levels
          </Typography>
          <Typography>
            We implement a tiered verification system:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>Level 1: Email verification (limit 500 TND/day)</li>
            <li>Level 2: Phone verification (limit 5,000 TND/day)</li>
            <li>Level 3: Full KYC verification (higher limits available)</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            4. Customer Due Diligence
          </Typography>
          <Typography>
            We collect and verify:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>Legal name and date of birth</li>
            <li>Residential address</li>
            <li>Government-issued ID</li>
            <li>Source of funds for large transactions</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            5. Prohibited Activities
          </Typography>
          <Typography>
            We strictly prohibit:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>Money laundering and terrorist financing</li>
            <li>Transactions with sanctioned individuals or entities</li>
            <li>Use of false or misleading information</li>
            <li>Structuring transactions to avoid reporting requirements</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            6. Transaction Monitoring
          </Typography>
          <Typography>
            We monitor transactions for:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>Unusual patterns or frequencies</li>
            <li>Large volume transactions</li>
            <li>Multiple accounts linked to same user</li>
            <li>Suspicious payment methods</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            7. Reporting
          </Typography>
          <Typography>
            We report:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>Suspicious transactions to relevant authorities</li>
            <li>Large transactions as required by law</li>
            <li>Attempted violations of this policy</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            8. Record Keeping
          </Typography>
          <Typography>
            We maintain records of:
          </Typography>
          <ul className="list-disc pl-6 mt-2">
            <li>All transactions for at least 5 years</li>
            <li>Customer identification documents</li>
            <li>Due diligence reports</li>
            <li>Suspicious activity reports</li>
          </ul>
        </section>

        <section>
          <Typography variant="h5" className="mb-4">
            9. Contact
          </Typography>
          <Typography>
            For AML-related inquiries, please contact our Compliance Officer at compliance@tetherpeer.com.
          </Typography>
        </section>
      </Paper>
    </Container>
  );
} 