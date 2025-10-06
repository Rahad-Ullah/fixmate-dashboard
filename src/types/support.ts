/* eslint-disable @typescript-eslint/no-explicit-any */
import { ticketPriorities, supportStatuses } from "@/constants/support";

export type TicketPriority = (typeof ticketPriorities)[number];
export type TicketStatus = (typeof supportStatuses)[number];

export interface ISupportTicket {
  _id: string;
  user: any;
  name: string;
  email: string;
  phone: string;
  title: string;
  description: string;
  attachment: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
}
