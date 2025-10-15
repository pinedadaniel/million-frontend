import { apiClient, ApiResponse } from '../client';
import {
  Property,
  PropertyFilters,
  PaginatedResponse,
} from '../types';

export class PropertiesService {
  private readonly endpoint = '/properties';

  async getProperties(filters?: PropertyFilters): Promise<ApiResponse> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const url = queryString ? `${this.endpoint}?${queryString}` : this.endpoint;
    
    return apiClient.get<PaginatedResponse<Property>>(url);
  }

}
export const propertiesService = new PropertiesService();
export default propertiesService;

