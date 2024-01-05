import React, { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import './HistoricalData.css';
import { clear } from '@testing-library/user-event/dist/clear';


const callApi = async (stockSymbol, api_key, setStockData) => {
  try {
    // const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=&outputsize=compact&apikey=${api_key}`);
   
    const  response=await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}.LON&outputsize=compact&apikey=${api_key}`)
   console.log(response.data["Time Series (Daily)"])
    setStockData(response.data["Time Series (Daily)"]);
  } catch (error) {
    console.error(error);
  }
}

const formatDate = (rawDate) => {
  const date = new Date(rawDate);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};
const getPRediction=(stockSymbol,setPredictionResult)=>{
 
  fetch('http://127.0.0.1:5000/getPrediction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: stockSymbol }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle response from Flask
       // console.log("hello",data.received_text);  // Access the received_text property
      //  console.log("Raw ml_result:", data.ml_result);
       
      //  const mlResultString = data.ml_result.replace(/'/g, '"').replace(/None/g, 'null');
      //  console.log("mlResultString:", mlResultString);
       
      //  try {
      //    const mlResultObject = JSON.parse(mlResultString);
      //    console.log(mlResultObject.shortName);
      //  } catch (error) {
      //    console.error("Error parsing JSON:", error);
      //  }
      //  
       
        setPredictionResult(data.ml_result);
       
      })
      .catch(error => {
        console.error('Error:', error);
      });
}
const HistoricalData = ({stockSymbol,stockData, setStockData,startDate,customDays=15}) => {
 
  // const stockSymbol = 'LLOY';
  const api_key = 'WVA7522VPWWOJAVA';
  const [predictionResult, setPredictionResult] = useState(""); // New state for prediction result
 const [countDown,setCountDown]=useState(45);
 const timer=useRef()
 const [isButtonActive, setIsButtonActive] = useState(false);


  useEffect(() => {
    setPredictionResult("")
    callApi(stockSymbol, api_key, setStockData);

  }, [stockSymbol,customDays]);

  useEffect(()=>{
    setIsButtonActive(false);
    timer.current=setInterval(()=>{
      setCountDown(prev=>prev-1)
      
    },[1000])
    return ()=>clearInterval(timer.current)
    
  },[stockSymbol])

  useEffect(()=>{

    if(countDown<=0){
      clearInterval(timer.current)
      setIsButtonActive(true);
      setCountDown(45)
    }
  },[countDown,setIsButtonActive])
//console.log(customDays)
  return (
    <>



    <div className="historical-data-component">
      <div>Historical Data : {stockSymbol}</div>
     {/*  */}
     
      <table>
        <tr>
          <th>Date</th>
          <th>Open</th>
          <th>High</th>
          <th>Low</th>
          <th>Close</th>
          <th>Volume</th>
        </tr>
      {/* {customDays} */}
        {stockData && Object.entries(stockData).slice(0,customDays).map(([date, data], index) => (
          <tr key={index}>
            <td>{formatDate(date)}</td>
            <td>{data["1. open"]}</td>
            <td>{data["2. high"]}</td>
            <td>{data["3. low"]}</td>
            <td>{data["4. close"]}</td>
            <td>{data["5. volume"]}</td>
          </tr>
        ))}



      </table>
      </div>
      <div className="container">

     
      <button className='btn' onClick={()=>getPRediction(stockSymbol,setPredictionResult)} disabled={!isButtonActive}>

      Click To Get Prediction
     
      </button>
      </div>
           
      {isButtonActive ? 
  (predictionResult && (
    <div>
      <h4>Prediction  For {stockSymbol} is {predictionResult}</h4>
     {/*  <p>{predictionResult}</p> */}
    </div>
  )) :
  <h3 className="text-4xl font-extrabold" style={{ color: 'red' }}>
    Prediction available in {countDown} seconds
  </h3>
}






      
    </>
  );
}

export default HistoricalData;
















