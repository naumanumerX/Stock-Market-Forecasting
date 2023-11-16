import React, { useMemo } from 'react';
import ReactApexChart  from "react-apexcharts";

const zoomableTimeSeriesData = ({ stockData,stockSymbol }) => {

    const TimeSeries=[];
  if (!stockData) {
    return (
      <div>
        Stock data is not available.
      </div>
    );
  }

  
  Object.entries(stockData).slice(0,30).map(([date,value]) => {
   // console.log("data is ",date ,"values is ",value["1. open"]);
   TimeSeries.push({
        x:date,
       y:  value["2. high"],
      
    
            
    })
   // useMemo(()=>candleStickData,stockData) 
    return null; 
  }
  
  
  );

 
  return (
    <>
     
      




 <ReactApexChart 
      series ={

        [
            {
                data:zoomableTimeSeries
            }
        ]
      }
      
      options={zoomableTimeSeries(stockSymbol)}
      type="area"
      width="100%" height="50%"
      /> 
    </>
  );
}

export default zoomableTimeSeriesData;
