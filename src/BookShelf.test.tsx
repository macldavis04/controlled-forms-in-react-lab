import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import BookShelf from "./BookShelf";

describe("BookShelf state", () => {
  it("starts with the two default books in the books state", () => {
    render(<BookShelf />);

    expect(screen.getByText("Project Hail Mary")).toBeInTheDocument();
    expect(screen.getByText("The Hobbit")).toBeInTheDocument();
  });

  it("updates the form state when the user types", async () => {
    const user = userEvent.setup();
    render(<BookShelf />);

    const titleInput = screen.getByLabelText("Title:");
    const authorInput = screen.getByLabelText("Author:");

    await user.type(titleInput, "Dune");
    await user.type(authorInput, "Frank Herbert");

    expect(titleInput).toHaveValue("Dune");
    expect(authorInput).toHaveValue("Frank Herbert");
  });

  it("adds the new book to the books state on submit", async () => {
    const user = userEvent.setup();
    render(<BookShelf />);

    await user.type(screen.getByLabelText("Title:"), "Dune");
    await user.type(screen.getByLabelText("Author:"), "Frank Herbert");
    await user.click(screen.getByRole("button", { name: "Add Book" }));

    expect(screen.getByText("Dune")).toBeInTheDocument();
    expect(screen.getByText("by Frank Herbert")).toBeInTheDocument();
  });

  it("resets the form state to empty after submit", async () => {
    const user = userEvent.setup();
    render(<BookShelf />);

    const titleInput = screen.getByLabelText("Title:");
    const authorInput = screen.getByLabelText("Author:");

    await user.type(titleInput, "Dune");
    await user.type(authorInput, "Frank Herbert");
    await user.click(screen.getByRole("button", { name: "Add Book" }));

    expect(titleInput).toHaveValue("");
    expect(authorInput).toHaveValue("");
  });
});