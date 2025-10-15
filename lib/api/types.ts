
export interface Property {
  id: string;
  name: string;
  address: string;
  price: number;
  image: string;
  description: string;
  sold: boolean;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface CreatePropertyData {
  name: string;
  address: string;
  price: number;
  image: string;
  description: string;
  ownerId: string;
}

export interface UpdatePropertyData {
  name?: string;
  address?: string;
  price?: number;
  image?: string;
  description?: string;
  sold?: boolean;
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  ownerId?: string;
  name?: string;
  pageSize?: number;
  page?: number;
  sortBy?: 'price' | 'createdAt' | 'name';
  sortOrder?: 'asc' | 'desc';
  address?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface Owner {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOwnerData {
  name: string;
  email: string;
  phone?: string;
}

export interface UpdateOwnerData {
  name?: string;
  email?: string;
  phone?: string;
}

