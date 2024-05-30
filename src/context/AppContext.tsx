import React, { createContext, useContext} from 'react';
import { DataLaminates, Packets } from '../models/DataModel';

interface ContextProps {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  currentLaminates: DataLaminates[];
  setCurrentLaminates: React.Dispatch<React.SetStateAction<DataLaminates[]>>;
  packets: Packets[];
  setPackets: React.Dispatch<React.SetStateAction<Packets[]>>;
}

export const AppContext = createContext<ContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
