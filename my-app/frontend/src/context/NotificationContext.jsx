import {
  createContext,
  useReducer,
  useEffect,
  useRef,
  useContext,
} from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    case "CLEAR_NOTIFICATION":
      return { message: null, type: "success" };
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, {
    message: null,
  });
  const timeoutRef = useRef(null);

  const setNotification = (message, type = "success") => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: { message, type },
    });
  };

  const clearNotification = () => {
    dispatch({ type: "CLEAR_NOTIFICATION" });
  };

  useEffect(() => {
    if (notification.message) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        clearNotification();
      }, 5000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [notification.message]);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
        clearNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
