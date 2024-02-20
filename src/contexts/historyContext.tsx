import React, { createContext, useContext, useState } from 'react';

// Create a context
const HistoryContext = createContext(null);

// Create a provider component
export const HistoryProvider = ({ children }: any) => {
    const [citiesHistory, setCitiesHistory] = useState<any>([]);

    return (
        <HistoryContext.Provider value={{ citiesHistory, setCitiesHistory } as any}>
            {children}
        </HistoryContext.Provider>
    );
};

// Custom hook to access the global state
export const useHistoryState = () => useContext(HistoryContext);
