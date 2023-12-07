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
         //   console.log( data["Time Series (Daily)"]['2023-11-23']["4. close"]);
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

        console.log("Risers hee", Risers);
        console.log("Fallers hee", Fallers);

        setRisers(Risers);
        setFallers(Fallers);

        // setLS((prev)=>[...prev,Risers])
        // setLS((prev)=>[...prev,Fallers])

        
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

    //const [lS,setLS]=useState([])

   
    useEffect(()=>{

        callApi(hotStocks,setRisers,setFallers);

        
    },[hotStocks])

    

    return (
        <div className="flex justify-end">
      <div className="p-4">
        <h5>Hot Stocks</h5>
        <Tab.Group>
          <Tab.List>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={selected ? 'bg-blue-500 text-white p-2 rounded-md' : 'bg-white text-black p-2 rounded-md'}
                >
                  Risers
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={selected ? 'bg-blue-500 text-white p-2 rounded-md' : 'bg-white text-black p-2 rounded-md'}
                >
                  Fallers
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {risers.map((data, index) => (
                    <tr key={index}>
                      <td>{data.stock}</td>
                      <td>{data.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tab.Panel>
            <Tab.Panel>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {fallers.map((data, index) => (
                    <tr key={index}>
                      <td>{data.stock}</td>
                      <td>{data.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
      );
    };
    
export default React.memo(HotStocks);