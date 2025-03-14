import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Column, Table } from "../Table";

interface TestData {
  id: number;
  name: string;
  age: number;
}

describe("Table", () => {
  const testData: TestData[] = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Smith", age: 30 },
    { id: 3, name: "Bob Johnson", age: 35 },
  ];

  const columns: Column<TestData>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Name", accessorKey: "name" },
    { header: "Age", accessorKey: "age" },
  ];

  it("renders correctly with data", () => {
    render(<Table data={testData} columns={columns} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
  });

  it("renders empty state when no data is provided", () => {
    render(<Table data={[]} columns={columns} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders custom empty state", () => {
    render(
      <Table
        data={[]}
        columns={columns}
        emptyState="Custom empty state message"
      />,
    );
    expect(screen.getByText("Custom empty state message")).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(<Table data={testData} columns={columns} loading />);
    expect(screen.getByRole("status")).toHaveClass("animate-spin");
  });

  it("handles sorting", () => {
    render(<Table data={testData} columns={columns} />);

    const nameHeader = screen.getByText("Name").closest("th");
    fireEvent.click(nameHeader!);

    const cells = screen.getAllByRole("cell");
    expect(cells[1]).toHaveTextContent("Bob Johnson");
    expect(cells[4]).toHaveTextContent("Jane Smith");
    expect(cells[7]).toHaveTextContent("John Doe");

    fireEvent.click(nameHeader!);

    const cellsAfterSecondClick = screen.getAllByRole("cell");
    expect(cellsAfterSecondClick[1]).toHaveTextContent("John Doe");
    expect(cellsAfterSecondClick[4]).toHaveTextContent("Jane Smith");
    expect(cellsAfterSecondClick[7]).toHaveTextContent("Bob Johnson");
  });

  it("handles filtering", () => {
    render(<Table data={testData} columns={columns} />);

    const filterInput = screen.getByPlaceholderText("Filter Name");
    fireEvent.change(filterInput, { target: { value: "John" } });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
    expect(screen.queryByText("Bob Johnson")).not.toBeInTheDocument();
  });

  it("handles pagination", () => {
    const onPageChange = vi.fn();
    render(
      <Table
        data={testData}
        columns={columns}
        pageSize={2}
        currentPage={1}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.queryByText("Bob Johnson")).not.toBeInTheDocument();

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("disables pagination buttons appropriately", () => {
    render(
      <Table data={testData} columns={columns} pageSize={2} currentPage={1} />,
    );

    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).not.toBeDisabled();
  });

  it("renders custom cell content", () => {
    const columnsWithCustomCell: Column<TestData>[] = [
      ...columns,
      {
        header: "Actions",
        accessorKey: "id",
        cell: (value, row) => (
          <button data-testid={`action-${row.id}`}>Action</button>
        ),
      },
    ];

    render(<Table data={testData} columns={columnsWithCustomCell} />);

    expect(screen.getByTestId("action-1")).toBeInTheDocument();
    expect(screen.getByTestId("action-2")).toBeInTheDocument();
    expect(screen.getByTestId("action-3")).toBeInTheDocument();
  });

  it("applies custom class names", () => {
    render(
      <Table
        data={testData}
        columns={columns}
        className="custom-table"
        headerClassName="custom-header"
        rowClassName="custom-row"
        cellClassName="custom-cell"
      />,
    );

    expect(screen.getByRole("table")).toHaveClass("custom-table");
    expect(screen.getByRole("rowgroup")).toHaveClass("custom-header");
    expect(screen.getAllByRole("row")[1]).toHaveClass("custom-row");
    expect(screen.getAllByRole("cell")[0]).toHaveClass("custom-cell");
  });
});
