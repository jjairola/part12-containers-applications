import { useNotification } from "../context/NotificationContext";

const Notification = () => {
  const { notification } = useNotification();

  if (!notification.message) {
    return null;
  }

  return (
    <div id="notification" className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  );
};

export default Notification;
