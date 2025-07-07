import { createContext, useState } from "react";
// 1. Create Context
export const ThemeContext = createContext();
export default function ThemeContextProvider({ children }) {
  // 2. State to manage current theme
  const [theme, setTheme] = useState("dark");
  // function to toogle the theam
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  // 4. Provide context value
  const contextValue = {
    theme,
    toggleTheme,
  };
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
