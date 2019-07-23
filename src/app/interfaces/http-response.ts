import { PubUserDetails } from './pub-user-details';

import { ErrorProps } from './error-props';
import { ProductsProps } from './products-props';

export interface HttpResponse {
  message?: string;
  error?: ErrorProps;
  sessid?: string;
  userDetails?: PubUserDetails;
  doc?: object | ProductsProps;
  docs?: object | object[] | ProductsProps[];
  status?: number;
  ok?: boolean;
  statusText?: string;
  enc?: string;
  link?: string;
  password?: string;
  who?: string;
}
