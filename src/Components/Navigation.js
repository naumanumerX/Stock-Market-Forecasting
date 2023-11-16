import React, { useState } from "react";
import {NavLink,Outlet} from 'react-router-dom'
import "./Navigation.css";

const Navigation = ({ stockSymbol, setStockSymbol }) => {
  const [stockSymbolValue, setStockSymbolValue] = useState("");
  const handleChange = (e) => {
    // const newSymbol = e.target.value;

    // Use a setTimeout to update the stockSymbol state after a delay
    // setTimeout(() => {
    setStockSymbolValue(e.target.value);
    // }, 3000);
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
            onClick={() => {
              setStockSymbol(stockSymbolValue);
            }}
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
