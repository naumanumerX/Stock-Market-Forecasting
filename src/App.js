import './App.css';
import Navigation from './Components/Navigation';
import HistoricalData from './Components/HistoricalData';
import CandleStick from './Components/CandleStick';
import { useState,useEffect } from 'react';
import DataRangePicker from './Components/DataRangePicker';
import { addDays ,differenceInDays} from 'date-fns'
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
   daysDifference = differenceInDays(range[0].endDate, range[0].startDate); // use can see data data of any dates he selects
   console.log(`Difference in days: ${daysDifference}`);
   
   let exculdingWeekends=Math.floor(daysDifference/7);
   let additonalDays=Math.floor(daysDifference%7);
   exculdingWeekends *=2;
   exculdingWeekends -=2;
   exculdingWeekends +=additonalDays;

  daysDifference -=exculdingWeekends;

   setCustomDays(daysDifference);

},[range])


  return (

    <>
    <div className="App">
      {/* <Navigation></Navigation> */}
      <Navigation  stockSymbol={stockSymbol} setStockSymbol={setStockSymbol} />
      <h1>App Componenrt renderered</h1>
     
  {stockSymbol}
  {customDays}
  <DataRangePicker range={range} setRange={setRange} />
  <HistoricalData  stockSymbol={stockSymbol} stockData={stockData} setStockData={setStockData} customDays={customDays} />
<CandleStick  stockData={stockData} customDays={customDays}/>

      
        
    </div>
  </>
  );
}

export default App;