import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './HistoricalData.css';


const callApi = async (stockSymbol, api_key, setStockData) => {
  try {
    // const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=&outputsize=compact&apikey=${api_key}`);
   
    const  response=await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}.LON&outputsize=compact&apikey=${api_key}`)
   console.log(response.data)
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
  fetch('http://127.0.0.1:5000/abcd', {
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
        setPredictionResult(data.ml_result); // Update state with the prediction result
      })
      .catch(error => {
        console.error('Error:', error);
      });
}
const HistoricalData = ({stockSymbol,stockData, setStockData,startDate,customDays=15}) => {
 
  // const stockSymbol = 'LLOY';
  const api_key = 'WVA7522VPWWOJAVA';
  const [predictionResult, setPredictionResult] = useState(""); // New state for prediction result
 
  useEffect(() => {
    callApi(stockSymbol, api_key, setStockData);
  }, [stockSymbol,customDays]);
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
      <button className='btn' onClick={()=>getPRediction(stockSymbol,setPredictionResult)}>Get Prediction</button>
      </div>
           
      {predictionResult && (
        <div>
          <h4>Prediction Result:</h4>
          <p>{predictionResult}</p>
        </div>
)}


      
    </>
  );
}

export default HistoricalData;
