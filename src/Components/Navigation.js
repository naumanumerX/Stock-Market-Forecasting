import React, { useState ,useEffect} from 'react';
import './Navigation.css';
import HistoricalData from './HistoricalData';
const Navigation = ({stockSymbol,setStockSymbol}) => {

  
    const handleChange = (e) => {
        const newSymbol = e.target.value;
    
        // Use a setTimeout to update the stockSymbol state after a delay
        setTimeout(() => {
          setStockSymbol(newSymbol);
        }, 3000);
      };

  return (
<>
    <nav className="navbar">
      <div className="left-section">
       
          MDX Stocks
        
      </div>
      <div className="search-section">
        <input type="text" placeholder="Enter Stock Name or Code" className="search-input"  />
        <button className="search-button" onClick={(e)=>handleChange(e)}>Search Stock</button>
      </div>
      <div className="right-section">
        <a>Historical Data</a>
        <a href="/about">About</a>
        <a href="/charts">Charts</a>
        <a href="/signup">Sign Up/Login</a>

        
      </div>
    </nav>
    <h3>{stockSymbol}</h3>
    
    
   


    </>
    
  );
};

export default Navigation;