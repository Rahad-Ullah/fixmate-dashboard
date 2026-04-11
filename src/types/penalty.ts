export interface IPenalty {
  _id: string;
  customId: string;
  user: string | {
    _id: string;
    name: string;
    email: string;
    image?: string;
    contact?: string;
    role: string;
  };
  type: 'PROVIDER' | 'CLIENT';
  booking: string | {
    _id: string;
    customId: string;
    bookingStatus: string;
    date: string;
    service: {
        _id: string;
        image: string;
        category: string;
        price: number;
    }
  };
  amount: number;
  taken: number;
  due: number;
  reason: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  updatedAt: string;
}
