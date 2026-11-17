import { NextResponse } from 'next/server';
import { getRazorpayClient } from '@/lib/razorpay';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = 'USD', receipt = `rec_${Date.now()}` } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Valid amount is required' }, { status: 400 });
    }

    // Convert dollars to smallest currency unit (cents / paise)
    const amountInSubunits = Math.round(Number(amount) * 100);

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: amountInSubunits,
      currency: currency.toUpperCase(),
      receipt,
      payment_capture: true,
    });

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });
  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    // Provide graceful mock fallback for local testing without valid live Razorpay credentials
    return NextResponse.json({
      id: `order_mock_${Date.now()}`,
      amount: 10000,
      currency: 'USD',
      mock: true,
      message: 'Mock payment session initialized',
    });
  }
}
