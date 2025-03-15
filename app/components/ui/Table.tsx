import { cn } from "@utils/cn";
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
  onSort?: (key: keyof T, direction: "asc" | "desc") => void;
}

export interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sortDirection?: "asc" | "desc" | null;
  onSort?: () => void;
  sortable?: boolean;
}

export const Th = forwardRef<HTMLTableCellElement, ThProps>(
  ({ className, children, sortDirection, onSort, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          "px-4 py-3 text-left text-sm font-semibold text-gray-900",
          onSort && "cursor-pointer select-none",
          className,
        )}
        onClick={onSort}
        {...props}
      >
        {onSort ? (
          <div className="flex items-center gap-2">
            {children}
            <div className="flex flex-col">
              <span
                className={cn(
                  "h-0 w-0 border-x-4 border-x-transparent border-b-4",
                  sortDirection === "asc"
                    ? "border-b-primary-600"
                    : "border-b-gray-300",
                )}
              />
              <span
                className={cn(
                  "h-0 w-0 border-x-4 border-x-transparent border-t-4",
                  sortDirection === "desc"
                    ? "border-t-primary-600"
                    : "border-t-gray-300",
                )}
              />
            </div>
          </div>
        ) : (
          children
        )}
      </th>
    );
  },
);

export const Td = forwardRef<
  HTMLTableCellElement,
  HTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={cn("px-4 py-3 text-sm text-gray-700", className)}
      {...props}
    />
  );
});

export function Table<T extends Record<string, unknown>>({
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
  onSort,
  ...props
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);
  const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({});

  const handleSort = (key: keyof T) => {
    const direction =
      sortConfig?.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
    onSort?.(key, direction);
  };

  const handleFilter = (key: keyof T, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const itemValue = String(item[key as keyof T] || "").toLowerCase();
        return itemValue.includes(value.toLowerCase());
      });
    });
  }, [data, filters]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = String(a[sortConfig.key] || "").toLowerCase();
      const bValue = String(b[sortConfig.key] || "").toLowerCase();

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
          aria-label="Loading"
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
    <div className="flex flex-col" {...props}>
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
                aria-label={`Filter by ${String(column.header)}`}
              />
            ))}
        </div>
      )}

      <div className="w-full custom-class">
        <table className={cn("w-full", className)}>
          <thead className={cn("bg-gray-50", headerClassName)}>
            <tr>
              {columns.map((column) => (
                <Th
                  key={String(column.accessorKey)}
                  sortable={sortable && column.sortable !== false}
                  sortDirection={
                    sortConfig?.key === column.accessorKey
                      ? sortConfig.direction
                      : null
                  }
                  onSort={
                    sortable && column.sortable !== false
                      ? () => handleSort(column.accessorKey)
                      : undefined
                  }
                  className={headerClassName}
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
                  "border-t border-gray-200",
                  rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white",
                  rowClassName
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
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700",
                currentPage === 1
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-50",
              )}
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700",
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-50",
              )}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {Math.min(
                    (currentPage - 1) * pageSize + 1,
                    totalItems ?? sortedData.length,
                  )}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    currentPage * pageSize,
                    totalItems ?? sortedData.length,
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {totalItems ?? sortedData.length}
                </span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => onPageChange?.(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={cn(
                    "relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500",
                    currentPage === 1
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-gray-50",
                  )}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => onPageChange?.(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={cn(
                    "relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500",
                    currentPage === totalPages
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-gray-50",
                  )}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Table.displayName = "Table";
Th.displayName = "Th";
Td.displayName = "Td";
