import apiClient from "@/lib/api/client";
import propertiesService from "@/lib/api/services/properties";

export { apiClient, handleApiError } from './client';
export type { ApiResponse, ApiError, RequestConfig } from './client';

export type {
  Property,
  CreatePropertyData,
  UpdatePropertyData,
  PropertyFilters,
  PaginatedResponse,
  Owner,
  CreateOwnerData,
  UpdateOwnerData,
} from './types';

export { propertiesService } from './services/properties'

export default {
  client: apiClient,
  services: {
    properties: propertiesService,
  },
};

