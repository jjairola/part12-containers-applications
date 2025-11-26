import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const BlogsContext = createContext();

export const BlogsProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const { data: blogs = [], isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, newObject }) => blogService.update(id, newObject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const value = {
    blogs,
    isLoading,
    error,
    createBlog: createBlogMutation.mutateAsync,
    updateBlog: updateBlogMutation.mutateAsync,
    deleteBlog: deleteBlogMutation.mutateAsync,
  };

  return (
    <BlogsContext.Provider value={value}>
      {children}
    </BlogsContext.Provider>
  );
};

export const useBlogs = () => useContext(BlogsContext);