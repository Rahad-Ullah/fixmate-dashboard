/* eslint-disable @typescript-eslint/no-explicit-any */
import { ticketPriorities, ticketStatuses } from "@/constants/support";

export type TicketPriority = (typeof ticketPriorities)[number];
export type TicketStatus = (typeof ticketStatuses)[number];

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
