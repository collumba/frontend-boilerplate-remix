import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Modal, ModalContent, ModalFooter, ModalHeader } from "../Modal";

describe("Modal", () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it("renders when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        Modal content
      </Modal>,
    );
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        Modal content
      </Modal>,
    );
    expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
  });

  it("applies different sizes correctly", () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={onClose} size="sm">
        Modal content
      </Modal>,
    );
    expect(screen.getByText("Modal content").parentElement).toHaveClass(
      "max-w-sm",
    );

    rerender(
      <Modal isOpen={true} onClose={onClose} size="lg">
        Modal content
      </Modal>,
    );
    expect(screen.getByText("Modal content").parentElement).toHaveClass(
      "max-w-lg",
    );
  });

  it("calls onClose when overlay is clicked and closeOnOverlayClick is true", async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={onClose} closeOnOverlayClick={true}>
        Modal content
      </Modal>,
    );

    const overlay = screen.getByRole("presentation", { hidden: true });
    await user.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it("does not call onClose when overlay is clicked and closeOnOverlayClick is false", async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={onClose} closeOnOverlayClick={false}>
        Modal content
      </Modal>,
    );

    const overlay = screen.getByRole("presentation", { hidden: true });
    await user.click(overlay);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when Escape key is pressed and closeOnEsc is true", () => {
    render(
      <Modal isOpen={true} onClose={onClose} closeOnEsc={true}>
        Modal content
      </Modal>,
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("does not call onClose when Escape key is pressed and closeOnEsc is false", () => {
    render(
      <Modal isOpen={true} onClose={onClose} closeOnEsc={false}>
        Modal content
      </Modal>,
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe("ModalHeader", () => {
  it("renders title and subtitle correctly", () => {
    render(<ModalHeader title="Modal Title" subtitle="Modal Subtitle" />);

    expect(screen.getByText("Modal Title")).toHaveClass("text-lg font-medium");
    expect(screen.getByText("Modal Subtitle")).toHaveClass(
      "text-sm text-gray-500",
    );
  });

  it("renders close button when onClose is provided", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(<ModalHeader title="Title" onClose={onClose} />);
    const closeButton = screen.getByRole("button");

    await user.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});

describe("ModalContent", () => {
  it("renders content with correct styles", () => {
    render(<ModalContent>Content</ModalContent>);
    expect(screen.getByText("Content").parentElement).toHaveClass("px-6 py-4");
  });
});

describe("ModalFooter", () => {
  it("renders footer with correct styles", () => {
    render(<ModalFooter>Footer content</ModalFooter>);
    expect(screen.getByText("Footer content").parentElement).toHaveClass(
      "flex",
      "items-center",
      "justify-end",
      "border-t",
    );
  });
});

describe("Modal composition", () => {
  it("renders all parts together correctly", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <ModalHeader title="Title" subtitle="Subtitle" />
        <ModalContent>Content</ModalContent>
        <ModalFooter>Footer</ModalFooter>
      </Modal>,
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
