import { createHmac } from 'crypto';

interface FlouciPaymentRequest {
  amount: number;
  orderId: string;
  ribNumber: string;
  description: string;
}

interface FlouciPaymentResponse {
  success: boolean;
  paymentId?: string;
  error?: string;
}

interface FlouciWebhookPayload {
  paymentId: string;
  orderId: string;
  status: 'COMPLETED' | 'FAILED' | 'PENDING';
  amount: number;
  timestamp: string;
  signature: string;
}

export class FlouciPaymentProvider {
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = process.env.FLOUCI_API_KEY!;
    this.apiSecret = process.env.FLOUCI_API_SECRET!;
    this.baseUrl = 'https://api.flouci.com/v1';
  }

  /**
   * Initialize a payment request
   */
  async initiatePayment({
    amount,
    orderId,
    ribNumber,
    description
  }: FlouciPaymentRequest): Promise<FlouciPaymentResponse> {
    try {
      const timestamp = Date.now().toString();
      const signature = this.generateSignature({
        amount: amount.toString(),
        orderId,
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
          ribNumber,
          description,
          currency: 'TND',
          successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/trade/success`,
          failureUrl: `${process.env.NEXT_PUBLIC_APP_URL}/trade/failure`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate payment');
      }

      const data = await response.json();
      return {
        success: true,
        paymentId: data.paymentId,
      };
    } catch (error) {
      console.error('Flouci payment initiation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment initiation failed',
      };
    }
  }

  /**
   * Verify webhook signature and payload
   */
  verifyWebhook(payload: FlouciWebhookPayload): boolean {
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
   * Check payment status
   */
  async checkPaymentStatus(paymentId: string): Promise<{
    status: 'COMPLETED' | 'FAILED' | 'PENDING';
    orderId: string;
  }> {
    try {
      const timestamp = Date.now().toString();
      const signature = this.generateSignature({
        paymentId,
        timestamp,
      });

      const response = await fetch(`${this.baseUrl}/payment/${paymentId}/status`, {
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