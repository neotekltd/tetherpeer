import { createHmac } from 'crypto';

interface D17PaymentRequest {
  amount: number;
  orderId: string;
  phoneNumber: string;
  description: string;
}

interface D17PaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
}

interface D17WebhookPayload {
  transactionId: string;
  orderId: string;
  status: 'COMPLETED' | 'FAILED' | 'PENDING';
  amount: number;
  timestamp: string;
  signature: string;
  smsCode?: string;
}

export class D17PaymentProvider {
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = process.env.D17_API_KEY!;
    this.apiSecret = process.env.D17_API_SECRET!;
    this.baseUrl = 'https://api.d17.tn/v1';
  }

  /**
   * Initialize a payment request
   */
  async initiatePayment({
    amount,
    orderId,
    phoneNumber,
    description
  }: D17PaymentRequest): Promise<D17PaymentResponse> {
    try {
      const timestamp = Date.now().toString();
      const signature = this.generateSignature({
        amount: amount.toString(),
        orderId,
        phoneNumber,
        timestamp,
      });

      const response = await fetch(`${this.baseUrl}/payment/init`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey,
          'X-Signature': signature,
          'X-Timestamp': timestamp,
        },
        body: JSON.stringify({
          amount,
          orderId,
          phoneNumber,
          description,
          currency: 'TND',
          callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/d17/webhook`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate payment');
      }

      const data = await response.json();
      return {
        success: true,
        transactionId: data.transactionId,
      };
    } catch (error) {
      console.error('D17 payment initiation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment initiation failed',
      };
    }
  }

  /**
   * Verify webhook signature and payload
   */
  verifyWebhook(payload: D17WebhookPayload): boolean {
    try {
      const { signature, ...data } = payload;
      const calculatedSignature = this.generateSignature(data);
      return signature === calculatedSignature;
    } catch (error) {
      console.error('Webhook verification error:', error);
      return false;
    }
  }

  /**
   * Generate HMAC signature for API requests
   */
  private generateSignature(data: Record<string, string>): string {
    const sortedParams = Object.keys(data)
      .sort()
      .map(key => `${key}=${data[key]}`)
      .join('&');

    return createHmac('sha256', this.apiSecret)
      .update(sortedParams)
      .digest('hex');
  }

  /**
   * Verify SMS code for payment confirmation
   */
  async verifySmsCode(transactionId: string, smsCode: string): Promise<boolean> {
    try {
      const timestamp = Date.now().toString();
      const signature = this.generateSignature({
        transactionId,
        smsCode,
        timestamp,
      });

      const response = await fetch(`${this.baseUrl}/payment/verify-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey,
          'X-Signature': signature,
          'X-Timestamp': timestamp,
        },
        body: JSON.stringify({
          transactionId,
          smsCode,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify SMS code');
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('SMS verification error:', error);
      return false;
    }
  }

  /**
   * Check payment status
   */
  async checkPaymentStatus(transactionId: string): Promise<{
    status: 'COMPLETED' | 'FAILED' | 'PENDING';
    orderId: string;
  }> {
    try {
      const timestamp = Date.now().toString();
      const signature = this.generateSignature({
        transactionId,
        timestamp,
      });

      const response = await fetch(`${this.baseUrl}/payment/${transactionId}/status`, {
        headers: {
          'X-API-Key': this.apiKey,
          'X-Signature': signature,
          'X-Timestamp': timestamp,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to check payment status');
      }

      const data = await response.json();
      return {
        status: data.status,
        orderId: data.orderId,
      };
    } catch (error) {
      console.error('Payment status check error:', error);
      throw error;
    }
  }
} 