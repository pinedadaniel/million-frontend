"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PropertyFilters } from "@/lib/api/types";

const MIN_PRICE = 2000000;
const MAX_PRICE = 26000000;

const filterSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  priceRange: z.array(z.number()).length(2).optional(),
});

type FilterFormData = z.infer<typeof filterSchema>;

interface PropertyFiltersProps {
  onFiltersChange: (filters: PropertyFilters) => void;
  loading?: boolean;
  initialFilters?: Partial<FilterFormData>;
}

export default function PropertyFiltersComponent({ 
  onFiltersChange, 
  loading = false,
  initialFilters = {}
}: PropertyFiltersProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      name: '',
      address: '',
      priceRange: [MIN_PRICE, MAX_PRICE],
      ...initialFilters
    }
  });

  const watchedPriceRange = watch('priceRange', [MIN_PRICE, MAX_PRICE]);

  const onSubmit = (data: FilterFormData) => {
    const cleanFilters: PropertyFilters = {};
    
    if (data.name && data.name.trim()) {
      cleanFilters.name = data.name.trim();
    }
    
    if (data.address && data.address.trim()) {
      cleanFilters.address = data.address.trim();
    }
    
    if (data.priceRange) {
      cleanFilters.minPrice = data.priceRange[0];
      cleanFilters.maxPrice = data.priceRange[1];
    }

    onFiltersChange(cleanFilters);
  };

  const handleReset = () => {
    reset({
      name: '',
      address: '',
      priceRange: [MIN_PRICE, MAX_PRICE]
    });
    onFiltersChange({});
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const isMin = e.target.name === 'minPrice';
    const currentRange = watchedPriceRange;
    
    if (isMin) {
      setValue('priceRange', [value, currentRange![1]]);
    } else {
      setValue('priceRange', [currentRange![0], value]);
    }
  };

  const locations = [
    "Fisher Island",
    "Bal Harbour", 
    "Sunny Isles",
    "South Beach",
    "Bay Harbor Islands",
    "Coconut Grove",
    "Edgewater"
  ];

  return (
    <div className="content__block">
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-12">
            <div className="filters-wrapper animate-in-up">

                <form onSubmit={handleSubmit(onSubmit)} className="filters-form">

                {/* Búsqueda y ubicación */}
                <div className="row g-4 mb-5">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label className="form-label small mb-2">Search by Name</label>
                      <input
                        {...register("name")}
                        type="text"
                        className="form-control"
                        placeholder="Enter property name..."
                        disabled={loading}
                      />
                    </div>
                  </div>
                  
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label className="form-label small mb-2">Location</label>
                      <div className="custom-select-wrapper">
                        <select
                          {...register("address")}
                          className="custom-select form-control"
                          disabled={loading}
                        >
                          <option value="">All Locations</option>
                          {locations.map(location => (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          ))}
                        </select>
                        <i className="ph ph-caret-down custom-select-arrow"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rango de precios con slider */}
                <div className="row g-3 mb-5">
                  <div className="col-12">
                    <label className="form-label small mb-3">Price Range</label>
                    
                    {/* Valores actuales */}
                    <div className="price-display d-flex justify-content-between mb-3">
                      <span className="price-value small">
                        Min: ${(watchedPriceRange![0] / 1000000).toFixed(1)}M
                      </span>
                      <span className="price-value small">
                        Max: ${(watchedPriceRange![1] / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    
                    {/* Dual Range Slider */}
                    <div className="dual-range-slider">
                      <input
                        type="range"
                        name="minPrice"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        step="500000"
                        value={watchedPriceRange![0]}
                        onChange={handlePriceRangeChange}
                        className="range-slider range-min"
                        disabled={loading}
                      />
                      <input
                        type="range"
                        name="maxPrice"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        step="500000"
                        value={watchedPriceRange![1]}
                        onChange={handlePriceRangeChange}
                        className="range-slider range-max"
                        disabled={loading}
                      />
                      <div className="range-track"></div>
                    </div>
                    
                    {/* Etiquetas de rango */}
                    <div className="range-labels d-flex justify-content-between mt-2">
                      <span className="range-label small">$2M</span>
                      <span className="range-label small">$26M</span>
                    </div>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-12 d-flex justify-content-center gap-3">
                    <button
                      type="submit"
                      className="btn btn-default pg-custom"
                      disabled={loading}
                    >
                      <span className="btn-caption">
                        {loading ? 'Filtering...' : 'Apply Filters'}
                      </span>
                    </button>

                    <button
                      type="button"
                      className="btn btn-line"
                      onClick={handleReset}
                      disabled={loading}
                    >
                      <span className="btn-caption">Clear All</span>
                    </button>
                  </div>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
