import './App.css';
import Navigation from './Components/Navigation';
import HistoricalData from './Components/HistoricalData';
import CandleStick from './Components/CandleStick';
import { useState,useEffect } from 'react';

 function App() {
  

  const [stockSymbol,setStockSymbol]=useState('BARC');

  const [stockData, setStockData] = useState(null);
  

  return (

    <>
    <div className="App">
      {/* <Navigation></Navigation> */}
      <Navigation  stockSymbol={stockSymbol} setStockSymbol={setStockSymbol} />
      <h1>App Componenrt renderered</h1>
     
  {stockSymbol}
  <HistoricalData stockData={stockData} setStockData={setStockData} />
<CandleStick  stockData={stockData} />

      
        
    </div>
  </>
  );
}

export default App;