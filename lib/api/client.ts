
import {Property} from "@/lib/api/types";

export interface ApiResponse {
  data: DataApi;
  message?: string;
  status: number;
  success: boolean;
}

export interface DataApi {
    available: ListDataApi,
    sold: ListDataApi,
    totalSold: number,
    totalAvailable: number,
    grandTotal: number,
}

export interface ListDataApi {
    data: Property[]
    totalCount: number,
    page: number,
    pageSize: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Error;
}

export interface RequestConfig {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
  cache?: RequestCache;
}

class ApiClient {
  private readonly baseURL: string;
  private defaultRetries: number = 3;
  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  constructor(baseURL?: string) {
    this.baseURL = baseURL || process.env.NEXT_PUBLIC_API_URL || '';
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit & RequestConfig = {}
  ): Promise<ApiResponse> {
    const {
      retries = this.defaultRetries,
      headers = {},
      ...fetchOptions
    } = options;

    const url = `${this.baseURL}${endpoint}`;
    const requestHeaders = { ...this.defaultHeaders, ...headers };

    let lastError: Error;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();

        const response = await fetch(url, {
          ...fetchOptions,
          headers: requestHeaders,
          signal: controller.signal,
        });


        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        let data: DataApi;

        if (contentType?.includes('application/json')) {
          data = await response.json();
        } else {
          data = (await response.text()) as unknown as DataApi;
        }

        return {
          data,
          status: response.status,
          success: true,
          message: 'Request successful',
        };

      } catch (error) {
        lastError = error as Error;

        if (error instanceof Error && error.message.includes('HTTP 4')) {
          break;
        }
      }
    }

    throw this.createApiError(lastError!);
  }
  private createApiError(error: Error): ApiError {
    const statusMatch = error.message.match(/HTTP (\d+):/);
    const status = statusMatch ? parseInt(statusMatch[1]) : 500;

    return {
      message: error.message,
      status,
      code: error.name,
      details: error,
    };
  }

  async get<T = ApiResponse>(endpoint: string, config?: RequestConfig): Promise<ApiResponse> {
    return this.makeRequest<T>(endpoint, { method: 'GET', ...config });
  }

}

export const apiClient = new ApiClient();

export const handleApiError = (error: ApiError): string => {
  switch (error.status) {
    default:
      return error.message || 'Ha ocurrido un error inesperado.';
  }
};

export default apiClient;

