import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

//custom hook
export const useSearch = () => {
    const context = useContext(SearchContext);
    if(!context) 
        throw new Error ("useSearch debe ser usado dentro del SearchProvider");
        return context;
    
}

export const SearchProvider = ({children}) => {
    const [search , setSearch] = useState("");
    return (
        <>
            <SearchContext.Provider value={{search, setSearch}}>
                {children}
            </SearchContext.Provider>
        </>
    )
}