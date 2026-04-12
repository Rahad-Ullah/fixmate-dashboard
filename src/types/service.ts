export interface IService {
  _id: string;
  customId: string;
  creator: {
    _id: string;
    name: string;
    email?: string;
    image?: string;
    contact?: string;
    address?: string;
    customId: string;
  };
  image: string;
  category: string;
  subCategory: string;
  price: number;
  expertise: string;
  isDeleted: boolean;
  isSuspended: boolean;
  createdAt: string;
  updatedAt: string;
}
