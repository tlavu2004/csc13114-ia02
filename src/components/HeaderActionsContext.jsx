import { createContext, useContext, useState } from "react";

const HeaderActionsContext = createContext(null);

export function HeaderActionsProvider({ children }) {
  const [actions, setActions] = useState(null);
  return (
    <HeaderActionsContext.Provider value={{ actions, setActions }}>
      {children}
    </HeaderActionsContext.Provider>
  );
}

export function useHeaderActions() {
  const ctx = useContext(HeaderActionsContext);
  if (!ctx) throw new Error("useHeaderActions must be used within HeaderActionsProvider");
  return ctx;
}
