export type ITransactionType = 'PAYMENT' | 'EARNINGS' | 'REFUND' | 'WITHDRAWAL' | 'PENALTY';

export interface ITransaction {
  _id: string;
  customId: string;
  type: ITransactionType;
  user: {
    _id: string;
    name: string;
    email: string;
    contact?: string;
    role: string;
    image?: string;
  };
  booking?: {
    _id: string;
    customId: string;
  };
  amount: number;
  fee: number;
  netAmount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  p2ptransactionId?: string;
  createdAt: string;
  updatedAt: string;
}
