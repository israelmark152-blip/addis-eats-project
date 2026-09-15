
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const StockContext = createContext();

const STOCK_STORAGE_KEY = "addis-eats-stock";

export function StockProvider({ children }) {
  const [stockMap, setStockMap] = useState(() => {
    const savedStock = localStorage.getItem(
      STOCK_STORAGE_KEY
    );

    return savedStock
      ? JSON.parse(savedStock)
      : {};
  });

  useEffect(() => {
    localStorage.setItem(
      STOCK_STORAGE_KEY,
      JSON.stringify(stockMap)
    );
  }, [stockMap]);

  function isInStock(id) {
    return stockMap[String(id)] !== false;
  }

  function setStock(id, inStock) {
    setStockMap((currentStock) => ({
      ...currentStock,
      [String(id)]: inStock,
    }));
  }

  function toggleStock(id) {
    setStockMap((currentStock) => {
      const key = String(id);
      const currentStatus = currentStock[key] !== false;

      return {
        ...currentStock,
        [key]: !currentStatus,
      };
    });
  }

  return (
    <StockContext.Provider
      value={{
        stockMap,
        isInStock,
        setStock,
        toggleStock,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  return useContext(StockContext);
}

