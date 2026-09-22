export interface CreateUrlRequest {
  originalUrl: string;
}

export interface UrlResponse {
  id: number;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  createdAt: string;
  expiresAt: string | null;
}

export interface UrlInfoResponse {
  shortCode: string;
  originalUrl: string;
  clickCount: number;
  createdAt: string;
}

export interface HealthResponse {
  status: string;
}

export type ApiErrorCode =
  | 'INVALID_URL'
  | 'NOT_FOUND'
  | 'RATE_LIMIT'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR'
  | 'TIMEOUT'
  | 'UNKNOWN';

export interface ApiError {
  code: ApiErrorCode;
  message: string;
}
