export interface IGetAllPayment {
  id: string;
  user_id: string;
  amount: string;
  created_date?: Date | null;
  order_code: string;
  status: string;
  paid_at?: Date | null;
  description?: string | null;
}
