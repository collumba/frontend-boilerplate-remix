import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tab, TabList, TabPanel, Tabs } from "../Tabs";

describe("Tabs", () => {
  const renderTabs = () => {
    return render(
      <Tabs defaultTab="tab1">
        <TabList>
          <Tab id="tab1">Tab 1</Tab>
          <Tab id="tab2">Tab 2</Tab>
          <Tab id="tab3" disabled>
            Tab 3
          </Tab>
        </TabList>
        <TabPanel id="tab1">Content 1</TabPanel>
        <TabPanel id="tab2">Content 2</TabPanel>
        <TabPanel id="tab3">Content 3</TabPanel>
      </Tabs>,
    );
  };

  it("renders correctly with default props", () => {
    renderTabs();
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content 1");
  });

  it("shows correct tab content when tab is clicked", async () => {
    const user = userEvent.setup();
    renderTabs();

    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    await user.click(tab2);

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content 2");
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  });

  it("handles disabled tabs correctly", async () => {
    const user = userEvent.setup();
    renderTabs();

    const disabledTab = screen.getByRole("tab", { name: "Tab 3" });
    await user.click(disabledTab);

    expect(screen.queryByText("Content 3")).not.toBeInTheDocument();
    expect(disabledTab).toBeDisabled();
  });

  it("applies correct styles to selected tab", () => {
    renderTabs();
    const selectedTab = screen.getByRole("tab", { name: "Tab 1" });
    const unselectedTab = screen.getByRole("tab", { name: "Tab 2" });

    expect(selectedTab).toHaveClass("text-primary-600", "border-primary-500");
    expect(unselectedTab).toHaveClass("text-gray-500");
  });

  it("handles controlled state correctly", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Tabs value="tab1" onChange={onChange}>
        <TabList>
          <Tab id="tab1">Tab 1</Tab>
          <Tab id="tab2">Tab 2</Tab>
        </TabList>
        <TabPanel id="tab1">Content 1</TabPanel>
        <TabPanel id="tab2">Content 2</TabPanel>
      </Tabs>,
    );

    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    await user.click(tab2);

    expect(onChange).toHaveBeenCalledWith("tab2");
  });

  it("maintains proper tab focus management", () => {
    renderTabs();
    const selectedTab = screen.getByRole("tab", { name: "Tab 1" });
    const unselectedTab = screen.getByRole("tab", { name: "Tab 2" });

    expect(selectedTab).toHaveAttribute("tabindex", "0");
    expect(unselectedTab).toHaveAttribute("tabindex", "-1");
  });

  it("forwards refs correctly", () => {
    const tabsRef = vi.fn();
    const tabListRef = vi.fn();
    const tabRef = vi.fn();
    const tabPanelRef = vi.fn();

    render(
      <Tabs ref={tabsRef}>
        <TabList ref={tabListRef}>
          <Tab id="tab1" ref={tabRef}>
            Tab 1
          </Tab>
        </TabList>
        <TabPanel id="tab1" ref={tabPanelRef}>
          Content 1
        </TabPanel>
      </Tabs>,
    );

    expect(tabsRef).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    expect(tabListRef).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    expect(tabRef).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
    expect(tabPanelRef).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });
});
