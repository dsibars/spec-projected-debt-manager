export interface Payment {
  id: string;
  debtId: string;
  amount: number; // in cents
  date: number;
  notes?: string;
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;
}
