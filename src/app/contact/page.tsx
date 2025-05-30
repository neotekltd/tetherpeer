'use client';

import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
} from '@mui/material';
import { useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';

export default function Contact() {
  const { t } = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log(formData);
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="text-center mb-8">
        <Typography variant="h3" component="h1" className="mb-4">
          Contact Us
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Have questions? We're here to help 24/7.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent className="p-6">
              <Typography variant="h5" className="mb-4">
                Get in Touch
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  margin="normal"
                  multiline
                  rows={4}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className="mt-4"
                  fullWidth
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent className="p-6">
              <Typography variant="h5" className="mb-4">
                Other Ways to Reach Us
              </Typography>
              
              <div className="space-y-6">
                <div>
                  <Typography variant="h6" className="mb-2">
                    Email Support
                  </Typography>
                  <Typography color="textSecondary">
                    support@tetherpeer.com
                  </Typography>
                </div>

                <div>
                  <Typography variant="h6" className="mb-2">
                    Business Hours
                  </Typography>
                  <Typography color="textSecondary">
                    24/7 Support
                  </Typography>
                </div>

                <div>
                  <Typography variant="h6" className="mb-2">
                    Location
                  </Typography>
                  <Typography color="textSecondary">
                    Tunisia
                  </Typography>
                </div>

                <div>
                  <Typography variant="h6" className="mb-2">
                    Social Media
                  </Typography>
                  <div className="flex gap-4">
                    <Button variant="outlined" color="primary">
                      Twitter
                    </Button>
                    <Button variant="outlined" color="primary">
                      Telegram
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
} 