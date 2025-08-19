import { createContext, useReducer } from "react";

type NotificationContextType = [
  string | null,
  React.Dispatch<{ type: string; payload?: string }>
];

const NotificationReducer = (
  state: string | null,
  action: { type: string; payload?: string }
) => {
  switch (action.type) {
    case "SET":
      return action.payload ?? state;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, nitificationDispatch] = useReducer(
    NotificationReducer,
    null
  );
  return (
    <NotificationContext.Provider value={[notification, nitificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
