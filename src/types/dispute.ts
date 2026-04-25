export interface IDispute {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    contact?: string;
    image?: string;
    role: string;
    address?: string;
  };
  bookingId: {
    _id: string;
    customId: string;
    bookingStatus: string;
    date: string;
    address?: string;
    service: {
        _id: string;
        image: string;
        category: string;
        price: number;
    }
  };
  raisedBy: "client" | "provider";
  reason: string;
  description: string;
  evidence: string[];
  status: "open" | "in_review" | "resolved";
  previousBookingStatus?: string;
  resolution?: {
    type: "refund" | "partial_refund" | "release_payment" | "rejected" | null;
    amount?: number;
    note?: string;
  };
  createdAt: string;
  updatedAt: string;
}
