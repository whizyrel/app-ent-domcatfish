export interface ProductsProps {
  title?: string;
  pack?: string;
  weight?: number;
  quantity?: number;
  price?: number;
  description?: string;
  imgs?: string[];
  availability?: boolean;
  shippingFee?: number;
  shippingInfo?: string;
  PID?: string;
}