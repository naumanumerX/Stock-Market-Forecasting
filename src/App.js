import './App.css';
import Navigation from './Components/Navigation';
import HistoricalData from './Components/HistoricalData';
import CandleStick from './Components/CandleStick';
import { useState,useEffect } from 'react';
import DataRangePicker from './Components/DataRangePicker';
import Slideshow from './Components/Slideshow'
import HotStocks from './HotStocks/HotStocks';
import { addDays ,differenceInDays} from 'date-fns'
import { RouterProvider, createBrowserRouter, createRoutesFromElements,Route } from 'react-router-dom';
import StockNews from './StockNews/StockNews';
import About from './About/About';
import MarketStatus from './Components/MarketStatus';
import FAQ from './FAQ/FAQ';
import TimeSeriesChart from './Charts/zoomableTimeSeriesData';
 function App() {
  

  const [stockSymbol,setStockSymbol]=useState('BARC');

  const [stockData, setStockData] = useState(null);
  const [hotStocks,setHotStocks]=useState([]);

  //for date range
  const [customDays,setCustomDays]=useState(0);
  const [range,setRange]=useState([
    {
        startDate:(new Date()),
        endDate: addDays(new Date(),- 15),
        key:'selection'
    }
  ]);

  let daysDifference=0;

useEffect(()=>{
   daysDifference = differenceInDays(range[0].endDate, range[0].startDate); 
   console.log(`Difference in days: ${daysDifference}`);
   
   let exculdingWeekends=Math.floor(daysDifference/7);
   let additonalDays=Math.floor(daysDifference%7);
   exculdingWeekends *=2;
   exculdingWeekends -=2;
   exculdingWeekends +=additonalDays;

  daysDifference -=exculdingWeekends;

   setCustomDays(daysDifference);

},[range])
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navigation stockSymbol={stockSymbol} setStockSymbol={setStockSymbol}/>} >
      
      <Route path="about" element={<About />} />
      <Route  path="charts" element={
      
      <> <CandleStick  stockData={stockData} customDays={customDays}/>
      <TimeSeriesChart  stockData={stockData} customDays={customDays} />
     
      
      </>
      
      }/> 
  

      <Route path="historicalData" element={
      
      <>
      <DataRangePicker range={range} setRange={setRange} />
       <HistoricalData  stockSymbol={stockSymbol} stockData={stockData} setStockData={setStockData} customDays={customDays} />
       </>
      }/>
          <Route path="about" element={<About stockSymbol={stockSymbol} />} />

           <Route  path="FAQ"  stockSymbol={stockSymbol}  element={<FAQ/>}/> 
      
     
      </Route >
  )
)

 

  return (

    <>
    <div className="App">
    
      {/* <Navigation></Navigation> */}
      {/* <Navigation  stockSymbol={stockSymbol} setStockSymbol={setStockSymbol} /> */}
    
      <RouterProvider router={router}  /> 
      
      {/* <h1>App Componenrt renderered</h1> */}
{/*      
  {stockSymbol}
  {customDays} */}
{/* <Test/> */}

<MarketStatus />

  <div className="flex-container">
   <Slideshow />
    <HotStocks  />
   
    </div>
   
    <StockNews />
   
    </div>
  </>
  );
}

export default App;