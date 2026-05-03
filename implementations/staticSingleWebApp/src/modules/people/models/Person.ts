export interface Person {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  groupIds: string[];
  createdAt: number;
  updatedAt: number;
}
