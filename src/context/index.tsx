import React, { createContext, useState, useContext } from 'react';

interface AppState {
  money: number;
  loaves: number;
  maxLoaves: number;
  loafPrice: number;
  oven: number;
  progress: number;
}

const initialState: AppState = {
  money: 0,
  loaves: 0,
  loafPrice: 2,
  maxLoaves: 10,
  oven: 1,
  progress: 0,
};

interface AppContext {
  state: AppState;
  actions: AppActions;
}

interface AppActions {
  addProgress: (amount: number) => void;
}

export const AppContext = createContext({} as AppContext);

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, setState] = useState<AppState>(initialState);

  const addProgress = (amount: number) => {
    setState((prev) => {
      const { progress: prevProgress } = prev;
      let newProgress = prevProgress + amount;
      let qty = 0;
      if (newProgress >= 1) {
        qty++;
        newProgress = prevProgress + amount - 1;
      }
      return { ...prev, progress: newProgress, loaves: prev.loaves + qty };
    });
  };

  return (
    <AppContext.Provider value={{ state, actions: { addProgress } }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
