import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import ThemeContext from './context/ThemContext';
import StockContext from './context/StockContext';
console.log(process.env.REACT_APP_API_KEY);
function App() {
  const [darkMode,setDarkMode] = useState(false);
  const [stockSymbol,setStockSymbol] = useState("FB");

  return <ThemeContext.Provider value={{darkMode,setDarkMode}}>
    <StockContext.Provider 
    value={{stockSymbol,setStockSymbol}}>
      <Dashboard/>
    </StockContext.Provider>
  </ThemeContext.Provider>
}

export default App;
