import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("BlogForm component", () => {
  it("form calls handler with correct parameters", () => {
    const createBlog = vi.fn();

    render(<BlogForm createBlog={createBlog} />);

    const titleInput = screen.getByLabelText("Title:");
    const authorInput = screen.getByLabelText("Author:");
    const urlInput = screen.getByLabelText("URL:");

    fireEvent.change(titleInput, { target: { value: "Blog Title" } });
    fireEvent.change(authorInput, { target: { value: "Blog Author" } });
    fireEvent.change(urlInput, { target: { value: "http://munblogi.com" } });

    const createButton = screen.getByRole("button", { name: "create" });
    fireEvent.click(createButton);

    expect(createBlog).toHaveBeenCalledTimes(1);
    expect(createBlog).toHaveBeenCalledWith({
      title: "Blog Title",
      author: "Blog Author",
      url: "http://munblogi.com",
    });
  });
});
