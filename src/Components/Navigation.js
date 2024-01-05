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

    const handleSearch = async() => {
      setStockSymbol(stockSymbolValue);
      navigate('/historicalData')
      // Inside your handleSearch function in the React component
      try {
        const response = await fetch('http://127.0.0.1:5000/fetchData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stock_symbol: stockSymbolValue }),
        });
    
        if (response.ok) {
          const result = await response.json();
          // Handle the result from the server, maybe update state or perform other actions.
          console.log(result);
        } else {
          console.error('Failed to fetch data from the server');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    

     
      
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
            <NavLink to="FAQ">User Support /FAQ</NavLink>
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
