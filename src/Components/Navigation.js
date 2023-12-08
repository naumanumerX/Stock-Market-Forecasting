import React, { useState } from "react";
import {NavLink,Outlet} from 'react-router-dom'
import "./Navigation.css";
import { useNavigate } from "react-router-dom";

const Navigation = ({ stockSymbol, setStockSymbol }) => {
  const [stockSymbolValue, setStockSymbolValue] = useState("");
  const navigate=useNavigate();

  const handleChange = (e) => {
    setStockSymbolValue(e.target.value);
  };

  const handleSearch = () => {
    setStockSymbol(stockSymbolValue);
    navigate('/historicalData')
    
  };

  return (
    <>
      <nav className="navbar">
        <div className="left-section">MDX Stocks</div>
        <div className="search-section">
          <input
            type="text"
            placeholder="Enter Stock Name or Code"
            className="search-input"
            onChange={handleChange}
            value={stockSymbolValue}
          />
          <button
            className="search-button"
            onClick={handleSearch}
            
          >
            Search Stock
           
          </button>
        </div>
        <div className="right-section">
          <NavLink to="about">About</NavLink>
          <NavLink to="charts">Charts</NavLink>
          <NavLink to="historicalData">Historical Data</NavLink>
          <NavLink to="signup">User Support /FAQ</NavLink>
        </div>
      </nav>
      <main>
        <Outlet/>
      </main>
      <h3
        style={{
          textTransform: "uppercase",
        }}
      >
        {/* {stockSymbol} */}
      </h3>
    </>
  );
};

export default Navigation;
