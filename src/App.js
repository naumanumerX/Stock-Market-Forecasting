import './App.css';
import Navigation from './Components/Navigation';
import HistoricalData from './Components/HistoricalData';
import CandleStick from './Components/CandleStick';
import { useState,useEffect } from 'react';
import DataRangePicker from './Components/DataRangePicker';

import About from './Components/About';
import { addDays ,differenceInDays} from 'date-fns'
import { RouterProvider, createBrowserRouter, createRoutesFromElements,Route } from 'react-router-dom';




 function App() {
  

  const [stockSymbol,setStockSymbol]=useState('BARC');

  const [stockData, setStockData] = useState(null);

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
      <Route  path="charts" element={<CandleStick  stockData={stockData} customDays={customDays}/>}/> 
  

      <Route path="historicalData" element={
      
      <>
      <DataRangePicker range={range} setRange={setRange} />
       <HistoricalData  stockSymbol={stockSymbol} stockData={stockData} setStockData={setStockData} customDays={customDays} />
       </>
      }
        />
      
     
      </Route>
  )
)

  return (

    <>
    <div className="App">
     
      {/* <Navigation></Navigation> */}
      {/* <Navigation  stockSymbol={stockSymbol} setStockSymbol={setStockSymbol} /> */}
      <marquee behavior="" direction="">Market closed - opens at 08:00 on 13 November</marquee>
      <RouterProvider router={router}  /> 

      
      {/* <h1>App Componenrt renderered</h1> */}
{/*      
  {stockSymbol}
  {customDays} */}
  
  


      
        
    </div>
  </>
  );
}

export default App;