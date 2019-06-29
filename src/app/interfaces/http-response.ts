import { PubUserDetails } from './pub-user-details';

import { ErrorProps } from './error-props';

export interface HttpResponse {
  message?: string;
  error?: ErrorProps;
  sessid?: string;
  userDetails?: PubUserDetails;
  doc?: object;
  docs?: object;
  status?: number;
  ok?: boolean;
  statusText?: string;
  enc?: string;
  link?: string;
  password?: string;
  who?: string;
}
