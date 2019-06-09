import { PubUserDetails } from './pub-user-details';

export interface HttpResponse {
  message?: string;
  error?: {
    error?: string;
  };
  sessid?: string;
  userDetails?: PubUserDetails;
  doc?: object;
  docs?: object;
}
