import React, { useEffect } from 'react'
import axios from 'axios';

let currentDayData=[];
let lastDayData=[];
let Risers=[];
let Fallers=[];

const callApi = async (hotStocks) => {
    const api_key = 'WVA7522VPWWOJAVA';

    try {
        const promises = hotStocks.map(async (stock) => {
            const { data } = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}.LON&outputsize=compact&apikey=${api_key}`);
            return {
                stock,
                currentDay: data["Time Series (Daily)"]['2023-11-24']["4. close"],
                lastDay: data["Time Series (Daily)"]['2023-11-23']["4. close"],
            };
        });

        const results = await Promise.all(promises);

        results.forEach(({ stock, currentDay, lastDay }) => {
            let temp = currentDay - lastDay;

            if (temp > 0) {
                Risers.push({ stock, value: currentDay });
            } else {
                Fallers.push({ stock, value: currentDay });
            }

            temp = 0;
        });

        console.log("Risers", Risers);
        console.log("Fallers", Fallers);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


const HotStocks = () => {

    const hotStocks=['KGF','OCDO','TSCO','VOD',
    'BARC','SMT','FLTR','ADM','LLOY',"HSBA"
    ];
   
    useEffect(()=>{

        callApi(hotStocks);

        
    },[])

    

  return (
    <div>
<h5>Hot Stocks</h5>



    </div>
  )
}

export default HotStocks