import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Todo from "./Todo.jsx";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe("Todo component", () => {
  describe("Test not done todo", () => {
    const todo = { text: "Test todo", done: false };
    it("renders correctly", () => {
      render(
        <Todo todo={todo} onClickDelete={() => {}} onClickComplete={() => {}} />
      );

      expect(screen.getByText("This todo is not done")).toBeInTheDocument();
      expect(screen.getByText("Delete")).toBeInTheDocument();
      expect(screen.getByText("Set as done")).toBeInTheDocument();
    });

    it("delete button works", async () => {
      const onClickDelete = vi.fn();
      const onClickComplete = vi.fn();
      render(
        <Todo
          todo={todo}
          onClickDelete={onClickDelete}
          onClickComplete={onClickComplete}
        />
      );

      const user = userEvent.setup();
      const button = screen.getByText("Delete");
      await user.click(button);

      expect(onClickComplete.mock.calls).toHaveLength(1);
    });
  });
});
