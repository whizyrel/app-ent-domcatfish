import { LinkProps } from './link-props';

export interface LinkProps {
  link?: string;
  title?: string;
  body?: string;
  addition?: string;
  srclink?: string;
  iconClass?: string;
  children?: LinkProps[];
}
