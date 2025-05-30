'use client';

import Image from "next/image";
import { Button, Container, TextField, MenuItem, Box, Typography, Card, CardContent } from '@mui/material';
import { useState } from 'react';
import SecurityIcon from '@mui/icons-material/Security';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SpeedIcon from '@mui/icons-material/Speed';
import PaymentsIcon from '@mui/icons-material/Payments';
import Link from 'next/link';

export default function Home() {
  const [tradeType, setTradeType] = useState('buy');
  const [network, setNetwork] = useState('trc20');

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
        <Container maxWidth="lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Buy & Sell USDT in Tunisia
              </h1>
              <p className="text-xl mb-6 text-gray-700">
                Fast, secure, and non-custodial P2P USDT trading platform optimized for Tunisia.
              </p>
              <div className="flex gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5,000 TND</div>
                  <div className="text-sm">Daily Limit</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <div className="text-sm">Networks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2</div>
                  <div className="text-sm">Payment Methods</div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image 
                src="/usdt-illustration.svg" 
                alt="USDT Trading"
                width={500}
                height={400}
                className="w-full max-w-md"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Trading Form Section */}
      <section className="py-16">
        <Container maxWidth="lg">
          <div className="max-w-md mx-auto">
            <Card className="mb-8">
              <CardContent>
                <div className="flex mb-6">
                  <Button 
                    variant={tradeType === 'buy' ? 'contained' : 'outlined'}
                    color="primary"
                    fullWidth
                    onClick={() => setTradeType('buy')}
                    className="mr-2"
                  >
                    Buy USDT
                  </Button>
                  <Button
                    variant={tradeType === 'sell' ? 'contained' : 'outlined'}
                    color="primary"
                    fullWidth
                    onClick={() => setTradeType('sell')}
                    className="ml-2"
                  >
                    Sell USDT
                  </Button>
                </div>

                <div className="grid gap-4">
                  <TextField
                    select
                    fullWidth
                    label="USDT Network"
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                  >
                    <MenuItem value="trc20">TRC20 (TRON)</MenuItem>
                    <MenuItem value="erc20">ERC20 (Ethereum)</MenuItem>
                    <MenuItem value="polygon">Polygon</MenuItem>
                  </TextField>
                  
                  <TextField
                    select
                    fullWidth
                    label="Payment Method"
                    defaultValue="flouci"
                  >
                    <MenuItem value="flouci">Flouci</MenuItem>
                    <MenuItem value="d17">D17</MenuItem>
                  </TextField>
                  
                  <TextField
                    fullWidth
                    label="Amount (TND)"
                    type="number"
                    placeholder="Enter amount"
                    InputProps={{
                      inputProps: { 
                        min: 0,
                        max: 5000
                      }
                    }}
                  />
                  
                  <Link href={`/${tradeType}-usdt`} className="w-full">
                    <Button 
                      variant="contained" 
                      color="primary"
                      fullWidth
                      size="large"
                    >
                      View {tradeType === 'buy' ? 'Buy' : 'Sell'} Offers
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Typography variant="body2" align="center" color="textSecondary" className="mb-4">
              Trading limits: Unverified - 500 TND/day | Verified - 5,000 TND/day
            </Typography>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="bg-blue-50 py-16">
        <Container maxWidth="lg">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TetherPeer?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <SecurityIcon color="primary" fontSize="large" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure</h3>
              <p className="text-gray-600">2-of-3 multisig escrow smart contracts</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <AccountBalanceWalletIcon color="primary" fontSize="large" />
              </div>
              <h3 className="text-xl font-bold mb-2">Non-Custodial</h3>
              <p className="text-gray-600">You control your private keys</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <SpeedIcon color="primary" fontSize="large" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast</h3>
              <p className="text-gray-600">Instant matching with local traders</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <PaymentsIcon color="primary" fontSize="large" />
              </div>
              <h3 className="text-xl font-bold mb-2">Local Payments</h3>
              <p className="text-gray-600">Flouci & D17 supported</p>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <Container maxWidth="lg">
          <h2 className="text-3xl font-bold text-center mb-2">How It Works</h2>
          <p className="text-center mb-12 text-gray-600">Three simple steps to trade USDT</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-primary mb-4">1</div>
                <h3 className="text-xl font-bold mb-2">Create Contract</h3>
                <p className="text-gray-600">Choose an offer and start a trade. Our platform creates a secure multisig escrow contract.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-primary mb-4">2</div>
                <h3 className="text-xl font-bold mb-2">Make Payment</h3>
                <p className="text-gray-600">Seller deposits USDT to escrow. Buyer sends TND payment via Flouci or D17.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-primary mb-4">3</div>
                <h3 className="text-xl font-bold mb-2">Release USDT</h3>
                <p className="text-gray-600">After payment confirmation, USDT is released from escrow to buyer's wallet.</p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="bg-blue-50 py-16">
        <Container maxWidth="lg">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">What is TetherPeer?</h3>
              <p className="text-gray-600">TetherPeer is a non-custodial P2P platform for trading USDT in Tunisia using local payment methods like Flouci and D17.</p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">What are the trading limits?</h3>
              <p className="text-gray-600">Unverified users can trade up to 500 TND per day. Verified users with phone verification can trade up to 5,000 TND per day.</p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Which USDT networks are supported?</h3>
              <p className="text-gray-600">We support USDT on TRC20 (TRON), ERC20 (Ethereum), and Polygon networks. TRC20 is recommended for lower fees.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Is KYC required?</h3>
              <p className="text-gray-600">Basic trading requires only email verification. Phone verification enables higher limits. We prioritize user privacy.</p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
