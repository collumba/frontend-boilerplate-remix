'use client';

import { Table, flexRender } from '@tanstack/react-table';
import { AlertCircle, ArrowDown, ArrowUp, ChevronDown } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Input } from '@/shared/ui/input';
import {
  TableBody,
  TableCell,
  Table as TableComponent,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { useTranslation } from 'react-i18next';
import { EmptyState } from './empty-state';
import { Skeleton } from './skeleton';

type DataTableProps<TData> = {
  table: Table<TData>;
  inputSearch?: {
    placeholder: string;
    onChange: (value: string) => void;
    searchByAccessor: string;
  };
  showColumnsText?: string;
  noResultsText?: string;
};

export function DataTable<TData>({
  table,
  inputSearch,
  showColumnsText,
  noResultsText,
}: DataTableProps<TData>) {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder={inputSearch?.placeholder ?? t('component.dataTable.inputSearch.placeholder')}
          value={
            (table
              .getColumn(inputSearch?.searchByAccessor ?? 'name')
              ?.getFilterValue() as string) ?? ''
          }
          onChange={(event) => {
            table
              .getColumn(inputSearch?.searchByAccessor ?? 'name')
              ?.setFilterValue(event.target.value ?? '');
            inputSearch?.onChange(event.target.value);
          }}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {showColumnsText ?? t('component.dataTable.showColumnsText')}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <TableComponent>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      <div className="flex items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => header.column.toggleSorting()}
                            className="ml-2"
                          >
                            {header.column.getIsSorted() ? (
                              header.column.getIsSorted() === 'asc' ? (
                                <ArrowUp className="w-4 h-4" />
                              ) : (
                                <ArrowDown className="w-4 h-4" />
                              )
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                  {noResultsText ?? t('component.dataTable.noResultsText')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableComponent>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {t('component.dataTable.selectedRows.of', {
            count: table.getFilteredSelectedRowModel().rows.length,
            total: table.getFilteredRowModel().rows.length,
          })}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t('component.dataTable.pagination.previous')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t('component.dataTable.pagination.next')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function DataTableSkeleton() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="rounded-md border">
        <TableComponent>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-8 w-full" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 20 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell key={index}>
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableComponent>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <Skeleton className="h-8 w-8" />
        </div>
        <div className="space-x-2 flex items-center">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
type DataTableErrorType = {
  title?: string;
  description?: string;
  reload?: () => void;
};
export function DataTableError({ title, description, reload }: DataTableErrorType) {
  const { t } = useTranslation();
  return (
    <EmptyState
      title={title ?? t('component.dataTable.error.title')}
      description={description ?? t('component.dataTable.error.description')}
      icon={AlertCircle}
    >
      {reload && (
        <Button variant="outline" onClick={reload}>
          {t('component.dataTable.error.button')}
        </Button>
      )}
    </EmptyState>
  );
}
