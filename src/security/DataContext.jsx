// DataContext.js
import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [rowData, setRowData] = useState(null);

  return (
    <DataContext.Provider value={{ rowData, setRowData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
