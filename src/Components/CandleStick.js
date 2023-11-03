import React, { useMemo } from 'react';
import ReactApexChart  from "react-apexcharts";
import { candleStickOptions } from './CandleStickChartOptions';
const CandleStick = ({ stockData }) => {

    const candleStickData=[];
  if (!stockData) {
    return (
      <div>
        Stock data is not available.
      </div>
    );
  }

  
  Object.entries(stockData).slice(0,30).map(([date,value]) => {
   // console.log("data is ",date ,"values is ",value["1. open"]);
    candleStickData.push({
        x:date,
       y: [value["1. open"],
       value["2. high"],
       value["3. low"],
       value["4. close"]
    ]
            
    })
   // useMemo(()=>candleStickData,stockData) 
    return null; 
  }
  
  
  );

 
  return (
    <>
      <h3>Chart component</h3>

      <ReactApexChart 
      series ={

        [
            {
                data:candleStickData
            }
        ]
      }
      
      options={candleStickOptions}
      type="candlestick"
      />
    </>
  );
}

export default CandleStick;
