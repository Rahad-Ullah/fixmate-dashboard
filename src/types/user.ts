
export type IUser = {
  _id: string;
  customId?: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  contact: string;
  whatsApp: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  location: {
    type: 'Point';
    coordinates: number[];
  };
  role: string;
  fcmToken: string;
  status: string;
  verified: boolean;
  // provider specific fields
  providerDetails?: {
    category?: string;
    nationalId?: string;
    nationality?: string;
    experience?: string;
    language?: string;
    overView?: string;
    wallet?: number;
    distance?: number;
    availableDay?: string[];
    startTime?: string;
    endTime?: string;
    isVatRegistered?: boolean;
    vatNumber?: string;
    companyName?: string;
    paystackRecipientCode?: string;
    paystackAccountId?: string;
    bankName?: string;
    accountNumber?: string;
    rankingScore?: number;
    totalRating?: number;
    averageRating?: number;
    verificationStatus?: boolean;
    metrics?: {
      acceptedJobs?: number;
      declinedJobs?: number;
      completedJobs?: number;
      totalReceivedJobs?: number;
      disputedJobs?: number;
      totalResponseTime?: number;
      totalResponseCount?: number;
    };
  }
};