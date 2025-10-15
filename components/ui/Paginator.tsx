"use client";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function Paginator({ 
  currentPage, 
  totalPages, 
  hasNextPage,
  hasPreviousPage,
  onPageChange, 
  loading = false 
}: PaginatorProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="content__block mt-5">
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-12 d-flex justify-content-center">
            <div className="pagination d-flex align-items-center animate-in-up">
              
              {/* Botón Anterior */}
              <button
                className={`btn btn-line-small me-3 ${!hasPreviousPage || loading ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!hasPreviousPage || loading}
              >
                <i className="ph ph-arrow-left me-2" />
                <span className="btn-caption">Previous</span>
              </button>

              {/* Información de página */}
              <span className="pagination-info mx-4 small">
                {loading ? 'Loading...' : `Page ${currentPage} of ${totalPages}`}
              </span>

              {/* Botón Siguiente */}
              <button
                className={`btn btn-line-small ms-3 ${!hasNextPage || loading ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNextPage || loading}
              >
                <span className="btn-caption">Next</span>
                <i className="ph ph-arrow-right ms-2" />
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
