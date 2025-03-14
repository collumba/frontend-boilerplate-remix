import {
  HTMLAttributes,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import { cn } from "~/utils/cn";

export interface Column<T> {
  header: ReactNode;
  accessorKey: keyof T;
  cell?: (value: T[keyof T], row: T) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
}

export interface TableProps<T> extends HTMLAttributes<HTMLTableElement> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalItems?: number;
  sortable?: boolean;
  filterable?: boolean;
  loading?: boolean;
  emptyState?: ReactNode;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
}

export interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sortDirection?: "asc" | "desc" | null;
  onSort?: () => void;
  sortable?: boolean;
}

export const Th = forwardRef<HTMLTableCellElement, ThProps>(
  ({ className, children, sortDirection, onSort, sortable, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          "px-4 py-3 text-left text-sm font-semibold text-gray-900",
          sortable && "cursor-pointer select-none",
          className,
        )}
        onClick={sortable ? onSort : undefined}
        {...props}
      >
        <div className="flex items-center gap-2">
          {children}
          {sortable && (
            <div className="flex flex-col">
              <span
                className={cn(
                  "h-0 w-0 border-x-4 border-x-transparent border-b-4",
                  sortDirection === "asc"
                    ? "border-b-gray-900"
                    : "border-b-gray-300",
                )}
              />
              <span
                className={cn(
                  "h-0 w-0 border-x-4 border-x-transparent border-t-4",
                  sortDirection === "desc"
                    ? "border-t-gray-900"
                    : "border-t-gray-300",
                )}
              />
            </div>
          )}
        </div>
      </th>
    );
  },
);

export const Td = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("px-4 py-3 text-sm text-gray-700", className)}
    {...props}
  />
));

export function Table<T>({
  className,
  data,
  columns,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
  totalItems,
  sortable = true,
  filterable = true,
  loading = false,
  emptyState,
  headerClassName,
  rowClassName,
  cellClassName,
  ...props
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({});

  const handleSort = useCallback((key: keyof T) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const handleFilter = useCallback((key: keyof T, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const itemValue = String(item[key as keyof T]);
        const filterValue = String(value);
        return itemValue.toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  }, [data, filters]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil((totalItems ?? sortedData.length) / pageSize);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"
          role="status"
        />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        {emptyState || "No data available"}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filterable && (
        <div className="flex flex-wrap gap-4">
          {columns
            .filter((column) => column.filterable !== false)
            .map((column) => (
              <input
                key={String(column.accessorKey)}
                type="text"
                placeholder={`Filter ${String(column.header)}`}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
                value={filters[column.accessorKey] || ""}
                onChange={(e) =>
                  handleFilter(column.accessorKey, e.target.value)
                }
              />
            ))}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className={cn("w-full", className)} {...props}>
          <thead className={cn("bg-gray-50", headerClassName)}>
            <tr>
              {columns.map((column) => (
                <Th
                  key={String(column.accessorKey)}
                  sortable={sortable && column.sortable !== false}
                  sortDirection={
                    sortConfig.key === column.accessorKey
                      ? sortConfig.direction
                      : null
                  }
                  onSort={() => handleSort(column.accessorKey)}
                >
                  {column.header}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  "border-t border-gray-200 bg-white",
                  rowIndex % 2 === 0 && "bg-gray-50",
                  rowClassName,
                )}
              >
                {columns.map((column) => (
                  <Td
                    key={String(column.accessorKey)}
                    className={cellClassName}
                  >
                    {column.cell
                      ? column.cell(row[column.accessorKey], row)
                      : String(row[column.accessorKey])}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, totalItems ?? sortedData.length)}{" "}
            of {totalItems ?? sortedData.length} results
          </div>
          <div className="flex gap-2">
            <button
              className={cn(
                "rounded-md border border-gray-300 px-3 py-1.5 text-sm",
                currentPage === 1 && "cursor-not-allowed opacity-50",
              )}
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={cn(
                "rounded-md border border-gray-300 px-3 py-1.5 text-sm",
                currentPage === totalPages && "cursor-not-allowed opacity-50",
              )}
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
