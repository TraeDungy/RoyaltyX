import { render, screen, fireEvent } from "@testing-library/react";
import ExpandableCard from "../ExpandableCard";

describe("ExpandableCard", () => {
  test("changes size when menu option selected", () => {
    render(<ExpandableCard title="Stats">Content</ExpandableCard>);
    const grid = screen.getByTestId("expandable-card");
    expect(grid).toHaveAttribute("data-size", "single");

    // open menu
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Double width"));
    expect(grid).toHaveAttribute("data-size", "double");

    // expand to full width
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Full width"));
    expect(grid).toHaveAttribute("data-size", "full");
  });
});
