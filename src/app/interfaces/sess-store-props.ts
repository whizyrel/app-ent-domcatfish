import { PubUserDetails } from './pub-user-details';

export interface SessStoreProps {
  id: string;
  dt: PubUserDetails;
  active: boolean;
  index?: number;
}
