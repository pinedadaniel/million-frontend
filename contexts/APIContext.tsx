"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {propertiesService, Property, PropertyFilters} from "@/lib/api";

type APIContextValue = {
    selectedProperty: Property | null;
    setSelectedProperty: (p: Property | null) => void;
    listProperties: Property[] | [];
    listSoldProperties: Property[] | [];
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    loading: boolean;
    goToPage: (page: number) => void;
    applyFilters: (filters: PropertyFilters) => void;
};

const APIContext = createContext<APIContextValue | undefined>(
  undefined
);

export function APIProvider({ children }: { children: React.ReactNode }) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const [listProperties, setListProperties] = useState<Property[]>([]);
  const [listSoldProperties, setListSoldProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<PropertyFilters>({});


  const getListProperties = async (page: number = 1, pageSize: number = 4, filters?: PropertyFilters)=> {
      setLoading(true);
      try {
        const filtersToApply = filters || currentFilters;
        const response = await propertiesService.getProperties({ 
          page, 
          pageSize,
          ...filtersToApply
        });
        
        if (response.success && response.data) {
          if (response.data.available && Array.isArray(response.data.available.data)) {
            setListProperties(response.data.available.data);
            setCurrentPage(response.data.available.page || 1);
            setTotalPages(response.data.available.totalPages || 1);
            setHasNextPage(response.data.available.hasNextPage || false);
            setHasPreviousPage(response.data.available.hasPreviousPage || false);
          }
          if (response.data.sold && Array.isArray(response.data.sold.data)) {
            setListSoldProperties(response.data.sold.data);
          }
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        setListProperties([]);
        setListSoldProperties([]);
      } finally {
        setLoading(false);
      }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      getListProperties(page, 6, currentFilters);
    }
  };

  const applyFilters = (filters: PropertyFilters) => {
    setCurrentFilters(filters);
    setCurrentPage(1);
    getListProperties(1, 4, filters);
  };

  useEffect(() => {
    if (selectedProperty) {
      document.documentElement.classList.add("popup-active");
    } else {
      document.documentElement.classList.remove("popup-active");
    }
  }, [selectedProperty]);


    useEffect(() => {
        try {
            getListProperties().then();
        }catch (e) {
            console.error(e);
        }
    }, []);

  return (
    <APIContext.Provider
      value={{ 
        selectedProperty, 
        setSelectedProperty, 
        listProperties, 
        listSoldProperties,
        currentPage,
        totalPages,
        hasNextPage,
        hasPreviousPage,
        loading,
        goToPage,
        applyFilters
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useProperty() {
  const ctx = useContext(APIContext);
  if (!ctx)
    throw new Error("usePortfolio must be used inside <APIProvider />");
  return ctx;
}
