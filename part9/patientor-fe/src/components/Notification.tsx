import { Alert } from "@mui/material";
import { useNotificationValue } from "../hooks/useNotification";

const Notification = () => {
  const value = useNotificationValue();

  return <>{value && <Alert severity="error">{value}</Alert>}</>;
};

export default Notification;
