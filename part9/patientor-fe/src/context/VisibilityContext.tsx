import { createContext, useReducer } from "react";

type VisibilityContextType = [boolean, React.Dispatch<{ type: string }>];

const visibilityReducer = (state: boolean, action: { type: string }) => {
  switch (action.type) {
    case "CHANGE":
      return !state;
    default:
      return state;
  }
};

const VisibilityContext = createContext<VisibilityContextType | null>(null);

export const VisibilityContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visibility, visibilityDispatch] = useReducer(visibilityReducer, false);

  return (
    <VisibilityContext.Provider value={[visibility, visibilityDispatch]}>
      {children}
    </VisibilityContext.Provider>
  );
};

export default VisibilityContext;
