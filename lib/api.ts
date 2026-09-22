import axios, { AxiosError, AxiosInstance } from 'axios';
import type {
  CreateUrlRequest,
  UrlResponse,
  UrlInfoResponse,
  HealthResponse,
  ApiError,
  ApiErrorCode,
} from '@/types/url';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function normalizeError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;

    if (axiosError.code === 'ECONNABORTED' || axiosError.code === 'ETIMEDOUT') {
      return {
        code: 'TIMEOUT',
        message: 'We couldn\'t reach TrimURL right now. Please try again.',
      };
    }

    if (!axiosError.response) {
      return {
        code: 'NETWORK_ERROR',
        message: 'We couldn\'t reach TrimURL right now. Please try again.',
      };
    }

    switch (status) {
      case 400:
        return {
          code: 'INVALID_URL',
          message: 'Please enter a valid URL.',
        };
      case 404:
        return {
          code: 'NOT_FOUND',
          message: 'This shortened link is no longer available.',
        };
      case 429:
        return {
          code: 'RATE_LIMIT',
          message: 'Too many requests. Please wait a moment and try again.',
        };
      case 500:
      case 502:
      case 503:
        return {
          code: 'SERVER_ERROR',
          message: 'Something went wrong. Please try again.',
        };
      default:
        return {
          code: 'UNKNOWN',
          message: 'Something went wrong. Please try again.',
        };
    }
  }

  return {
    code: 'UNKNOWN',
    message: 'Something went wrong. Please try again.',
  };
}

export async function createShortUrl(originalUrl: string): Promise<UrlResponse> {
  try {
    const requestBody: CreateUrlRequest = { originalUrl };
    const response = await apiClient.post<UrlResponse>('/api/urls', requestBody);
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function getUrlInfo(shortCode: string): Promise<UrlInfoResponse> {
  try {
    const response = await apiClient.get<UrlInfoResponse>(
      `/api/urls/${shortCode}`
    );
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function checkHealth(): Promise<HealthResponse> {
  try {
    const response = await apiClient.get<HealthResponse>('/api/health');
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export { normalizeError };
export type { ApiErrorCode };
