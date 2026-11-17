import Razorpay from 'razorpay';
import crypto from 'crypto';

export const getRazorpayClient = () => {
  const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_dummy';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';

  return new Razorpay({
    key_id,
    key_secret,
  });
};

export const verifyRazorpayPayment = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
};
