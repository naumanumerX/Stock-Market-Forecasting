import React, { useState, useEffect } from "react";
import "./Navigation.css";
import HistoricalData from "./HistoricalData";
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
          <a href="/historical-data">Historical Data</a>
          <a href="/about">About</a>
          <a href="/charts">Charts</a>
          <a href="/signup">Sign Up/Login</a>
        </div>
      </nav>
      <h3
        style={{
          textTransform: "uppercase",
        }}
      >
        {stockSymbol}
      </h3>
    </>
  );
};

export default Navigation;
