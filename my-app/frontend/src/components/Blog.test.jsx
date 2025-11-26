import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog component", () => {
  const blog = {
    title: "Test Title",
    author: "Test Author",
    url: "http://test.com",
    likes: 5,
    user: { name: "Test User" },
  };

  it("renders blog title and author, and not render url and likes", () => {
    render(<Blog blog={blog} showDelete={false} />);

    const title = screen.getByText("Test Title", {
      exact: false,
    });
    expect(title).toBeInTheDocument();

    const author = screen.getByText("Test Author", {
      exact: false,
    });
    expect(author).toBeInTheDocument();

    const url = screen.queryByText("http://test.com");
    expect(url).not.toBeInTheDocument();

    const likes = screen.queryByText("likes 5");
    expect(likes).not.toBeInTheDocument();
  });

  it("render url and likes when view button is clicked", () => {
    render(<Blog blog={blog} showDelete={false} />);

    fireEvent.click(screen.getByRole("button", { name: "view" }));

    const url = screen.getByText("http://test.com", {
      exact: false,
    });
    expect(url).toBeInTheDocument();

    const likes = screen.getByText("5", {
      exact: false,
    });
    expect(likes).toBeInTheDocument();
  });

  it("click two times like", () => {
    const clickHandler = vi.fn();

    render(<Blog blog={blog} onLike={clickHandler} />);

    fireEvent.click(screen.getByRole("button", { name: "view" }));
    const likeButton = screen.getByRole("button", { name: "like" });
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(clickHandler).toHaveBeenCalledTimes(2);
  });
});
