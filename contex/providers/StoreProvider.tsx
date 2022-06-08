import React, { createContext, ReactNode } from "react";
import Store, { StoreReturnType } from "../store/Store";

export const StoreContext = createContext<StoreReturnType | null>(null);

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const store = Store();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
