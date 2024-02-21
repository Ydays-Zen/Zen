// CategoryContext.jsx

import { createContext, useContext, useState } from "react";

// Création du contexte
const CategoryContext = createContext();

// Hook personnalisé pour accéder au contexte
// eslint-disable-next-line react-refresh/only-export-components
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategory doit être utilisé à l'intérieur d'un CategoryProvider"
    );
  }
  return context;
};

// Provider pour envelopper votre application
// eslint-disable-next-line react/prop-types
export const CategoryProvider = ({ children }) => {
  const [btnValue, setBtnValue] = useState("");

  if (btnValue === "All") {
    setBtnValue("");
  }

  return (
    <CategoryContext.Provider value={{ btnValue, setBtnValue }}>
      {children}
    </CategoryContext.Provider>
  );
};