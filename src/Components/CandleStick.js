import React from 'react';
import ReactApexChart  from "react-apexcharts";
import { candleStickOptions } from './CandleStickChartOptions';
import './CandleStick.css'

const CandleStick = ({ stockData,stockSymbol,customDays }) => {

    const candleStickData=[];
  if (!stockData) {
    return (
      <div>
        Stock data is not available.
      </div>
    );
  }

  
  Object.entries(stockData).slice(0,customDays).map(([date,value]) => {
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
    <div className="chart-component">
      <h3 style={{textAlign:"center"}}><u>Chart </u></h3>

      <div className="chart">
      <ReactApexChart 
      series ={

        [
            {
                data:candleStickData
            }
        ]
      }
      
      options={candleStickOptions(stockSymbol)}
      type="candlestick"
      style={{ width:"100%", height:"100%"}}
      />
      </div>
    </div>




{/* <ReactApexChart 
      series ={

        [
            {
                data:candleStickData[0]
            }
        ]
      }
      
      options={zoomableTimeSeries(stockSymbol)}
      type="area"
      width="100%" height="50%"
      /> */}
    </>
  );
}

export default CandleStick;
