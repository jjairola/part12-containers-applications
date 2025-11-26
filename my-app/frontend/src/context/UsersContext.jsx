import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import usersService from "../services/users";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
  });

  const value = {
    users,
    isLoading,
    error,
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);