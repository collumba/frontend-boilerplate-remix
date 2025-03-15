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
import { Spinner } from "./Spinner";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  pageSize?: number;
}

export interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  onSort?: () => void;
  sortDirection?: "asc" | "desc" | undefined;
}

export const Th = forwardRef<HTMLTableCellElement, ThProps>(
  ({ children, className, onSort, sortDirection, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          "px-4 py-3 text-left text-sm font-semibold text-gray-900",
          onSort && "cursor-pointer select-none",
          className
        )}
        onClick={onSort}
        {...props}
      >
        <div className="flex items-center gap-1">
          {children}
          {sortDirection && (
            <span className="flex flex-col">
              <span
                className={cn(
                  "h-0 w-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent",
                  sortDirection === "asc"
                    ? "border-b-primary-600"
                    : "border-b-gray-300"
                )}
              />
              <span
                className={cn(
                  "h-0 w-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent",
                  sortDirection === "desc"
                    ? "border-t-primary-600"
                    : "border-t-gray-300"
                )}
              />
            </span>
          )}
        </div>
      </th>
    );
  }
);

export interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export const Td = forwardRef<HTMLTableCellElement, TdProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn("px-4 py-3 text-sm text-gray-900", className)}
        {...props}
      >
        {children}
      </td>
    );
  }
);

export function Table<T>({
  columns,
  data,
  className,
  isLoading = false,
  emptyMessage = "No data available",
  pageSize = 10,
  ...props
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleSort = (key: string) => {
    if (sortColumn === key) {
      setSortDirection(
        sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc"
      );
      if (sortDirection === "desc") {
        setSortColumn(null);
      }
    } else {
      setSortColumn(key);
      setSortDirection("asc");
    }
  };

  const handleFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredData = data.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const itemValue = (item as any)[key];
      return itemValue
        ?.toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    });
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;
    const aValue = (a as any)[sortColumn];
    const bValue = (b as any)[sortColumn];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    const aString = aValue?.toString() || "";
    const bString = bValue?.toString() || "";
    return sortDirection === "asc"
      ? aString.localeCompare(bString)
      : bString.localeCompare(aString);
  });

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col" {...props}>
      {columns.some((col) => filters[col.key]) && (
        <div className="flex flex-wrap gap-4">
          {columns.map((column) => (
            <input
              key={column.key}
              type="text"
              placeholder={`Filter ${column.header}`}
              value={filters[column.key] || ""}
              onChange={(e) => handleFilter(column.key, e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
              aria-label={`Filter by ${column.header}`}
            />
          ))}
        </div>
      )}
      <div className={cn("w-full", className)}>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <Th
                  key={column.key}
                  onSort={column.sortable ? () => handleSort(column.key) : undefined}
                  sortDirection={
                    sortColumn === column.key ? sortDirection || undefined : undefined
                  }
                >
                  {column.header}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="py-4 text-center">
                  <div className="flex justify-center">
                    <Spinner className="h-8 w-8" />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Loading data...</p>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-4 text-center">
                  <p className="text-sm text-gray-500">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {columns.map((column) => (
                    <Td key={column.key}>
                      {column.render
                        ? column.render(item)
                        : (item as any)[column.key]}
                    </Td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "rounded-md border border-gray-300 px-3 py-1 text-sm",
              currentPage === 1 && "cursor-not-allowed opacity-50"
            )}
            aria-label="Previous page"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "rounded-md border border-gray-300 px-3 py-1 text-sm",
              currentPage === totalPages && "cursor-not-allowed opacity-50"
            )}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

Table.displayName = "Table";
Th.displayName = "Th";
Td.displayName = "Td";
