export interface HttpResponse {
  message?: string;
  error?: {
    error?: string;
  };
  sessid?: string;
  details?: string;
  doc?: object;
  docs?: object;
}
