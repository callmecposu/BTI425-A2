// GlobalStateContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context
const SearchContext = createContext(null);

// Create a provider component
export const SearchProvider = ({ children }: any) => {
    const [searchResults, setSearchResults] = useState<any>([]);
    const [curPage, setCurPage] = useState<any>(null)

    return (
        <SearchContext.Provider value={{ searchResults, setSearchResults, curPage, setCurPage } as any}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom hook to access the global state
export const useSearchResultsState = () => useContext(SearchContext);
