export interface IPayment {
  _id: string;
  paymentStatus: string;
  customer: string | { _id: string; name: string; email: string; address?: string };
  provider: string | { _id: string; name: string; email: string; address?: string };
  service: {
    _id: string;
    image: string;
    category: string;
    subCategory: string;
    price?: number;
  };
  booking: string;
  paymentId: string;
  servicePrice: number;
  vat: number;
  platformFee: number;
  paystackGatewayFee: number;
  providerPay: number;
  clientPenalty?: number;
  providerPenalty?: number;
  refundAmount?: number;
  createdAt: string;
  updatedAt: string;
  customId: string;
}
