'use client';

import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';

export default function FAQ() {
  const { t } = useLocale();

  const faqSections = [
    {
      title: t('faq.gettingStarted.title'),
      questions: [
        {
          q: t('faq.gettingStarted.q1'),
          a: t('faq.gettingStarted.a1'),
        },
        {
          q: t('faq.gettingStarted.q2'),
          a: t('faq.gettingStarted.a2'),
        },
        {
          q: t('faq.gettingStarted.q3'),
          a: t('faq.gettingStarted.a3'),
        },
      ],
    },
    {
      title: t('faq.trading.title'),
      questions: [
        {
          q: t('faq.trading.q1'),
          a: t('faq.trading.a1'),
        },
        {
          q: t('faq.trading.q2'),
          a: t('faq.trading.a2'),
        },
        {
          q: t('faq.trading.q3'),
          a: t('faq.trading.a3'),
        },
      ],
    },
    {
      title: t('faq.security.title'),
      questions: [
        {
          q: t('faq.security.q1'),
          a: t('faq.security.a1'),
        },
        {
          q: t('faq.security.q2'),
          a: t('faq.security.a2'),
        },
        {
          q: t('faq.security.q3'),
          a: t('faq.security.a3'),
        },
      ],
    },
    {
      title: t('faq.technical.title'),
      questions: [
        {
          q: t('faq.technical.q1'),
          a: t('faq.technical.a1'),
        },
        {
          q: t('faq.technical.q2'),
          a: t('faq.technical.a2'),
        },
        {
          q: t('faq.technical.q3'),
          a: t('faq.technical.a3'),
        },
      ],
    },
  ];

  return (
    <Container maxWidth="lg" className="py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <Typography variant="h3" component="h1" className="mb-4">
          {t('faq.title')}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {t('faq.subtitle')}
        </Typography>
      </div>

      {/* FAQ Sections */}
      {faqSections.map((section, index) => (
        <div key={section.title} className="mb-8">
          <Typography variant="h5" className="mb-4">
            {section.title}
          </Typography>
          
          {section.questions.map((item, qIndex) => (
            <Accordion key={qIndex} className="mb-2">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="hover:bg-gray-50"
              >
                <Typography variant="subtitle1" className="font-medium">
                  {item.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="textSecondary">
                  {item.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      ))}

      {/* Still Have Questions */}
      <Card className="mt-12 bg-primary-50">
        <CardContent className="text-center py-8">
          <Typography variant="h5" className="mb-4">
            {t('faq.cta.title')}
          </Typography>
          <Typography className="mb-6">
            {t('faq.cta.subtitle')}
          </Typography>
          <Link href="/contact">
            <Button variant="contained" color="primary" size="large">
              {t('common.contact')}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
} 