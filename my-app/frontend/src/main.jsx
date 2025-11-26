import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BlogsProvider } from "./context/BlogsContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AuthProvider } from "./context/AuthContext";
import { UsersProvider } from "./context/UsersContext";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <AuthProvider>
          <UsersProvider>
            <BlogsProvider>
              <App />
            </BlogsProvider>
          </UsersProvider>
        </AuthProvider>
      </NotificationProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
