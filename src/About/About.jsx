import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './About.css'

const companyOverviewAPI = async (stockSymbol, setAbout) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/about', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: stockSymbol }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const importantData = extractImportantData(data.about);

    setAbout(importantData);
  } catch (error) {
    console.error('Error:', error);
  }
};

const extractImportantData = (fullData) => {
  
  const importantRows = [
    'symbol',
   
    'address1',
    'sector',
    'industry',
    
    'currentPrice',
    'marketCap',
    'open',
    'dayHigh',
    'dayLow',
    'previousClose',
    'volume',
    'averageVolume',
    'earningsQuarterlyGrowth',
    'dividendYield',
    'payoutRatio',
    'bid',
    'ask',
    'targetMeanPrice',
    'longName',
    'longBusinessSummary',
    'fullTimeEmployees',
    'companyOfficers.name',
   
    
    'phone',
    'website',
  ];

  const importantData = importantRows.reduce((acc, key) => {
    if (fullData.hasOwnProperty(key)) {
      acc[key] = fullData[key];
    }
    return acc;
  }, {});

  return importantData;
};

const About = ({ stockSymbol }) => {
  const [about, setAbout] = useState({});

  useEffect(() => {
    companyOverviewAPI(stockSymbol, setAbout);
  }, [stockSymbol]);

  return (
    <>
      <div className='table'style={{padding:"20px"}}>

        <h3 style={{marginBottom:'20px'}}><b>Company Information</b> </h3>
      <table>
        <tbody>
         
          {Object.entries(about).map(([key, value],index) => (
            <tr key={index}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default About;
