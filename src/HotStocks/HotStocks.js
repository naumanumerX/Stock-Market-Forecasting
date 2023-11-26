import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'

let currentDayData=[];
let lastDayData=[];
let Risers=[];
let Fallers=[];

const callApi = async (hotStocks,setRisers,setFallers) => {
    const api_key = 'WVA7522VPWWOJAVA';

    try {
        const promises = hotStocks.map(async (stock) => {
            const { data } = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}.LON&outputsize=compact&apikey=${api_key}`);
          // console.log(data)
            console.log( data["Time Series (Daily)"]['2023-11-23']["4. close"]);
            return {
                stock,
                currentDay: data["Time Series (Daily)"]["2023-11-24"]["4. close"],
                lastDay: data["Time Series (Daily)"]["2023-11-23"]["4. close"],
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

        setRisers(Risers);
        setFallers(Fallers);

        console.log("Risers", Risers);
        console.log("Fallers", Fallers);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


const HotStocks = () => {

    // const hotStocks=['KGF','OCDO','TSCO','VOD',
    // 'BARC','SMT','FLTR','RR.','BARC',"HSBA"
    // ];

      const hotStocks=['KGF','OCDO','TSCO','VOD',
    'BARC','SMT','FLTR',"HSBA","SGE","LAND","FCIT","SGRO"
    ];

    const [risers,setRisers]=useState([]);
    const [fallers,setFallers]=useState([])

   
    useEffect(()=>{

        callApi(hotStocks,setRisers,setFallers);

        
    },[hotStocks])

    

  return (
    <div>
<h5>Hot Stocks</h5>


 <Tab.Group>
      <Tab.List>
        <Tab>Risers</Tab>
        <Tab>Fallers</Tab>
        
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel >
          <div className="rounded-md bg-blue text-white"> // this is not

        
            {
                risers.map((data,index)=>(
                    <p key={index}>
                        {data.stock }:{data.value}
                    </p>
                    
                ))
            }
            </div>
        </Tab.Panel>
        <Tab.Panel>
            {
                fallers.map((data,index)=>(
                    <p key={index}>
                        {data.stock }:{data.value}
                    </p>
                    
                ))
            }
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group> 
   


    </div>

    
  )
}

export default HotStocks