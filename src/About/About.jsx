import React, { useEffect } from 'react'
import axios from 'axios';
const companyOverviewAPI= async (stockSymbol,apiKey)=>{
    let response= await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=${apiKey}`);
    console.log("About")
    console.log(response.data);
    console.log(response.data.Country);
    console.log(response.data.Description);
   
}
const About = ({stockSymbol}) => {
    const apiKey = 'WVA7522VPWWOJAVA';
  let data='';
    useEffect(()=>{

      const fetchData=async()=>{
      let data=  companyOverviewAPI(stockSymbol,apiKey)
      }  
      fetchData();
    },[stockSymbol])
  return (
    <div>
      <div>ABOUTs</div>
        
    {data}
    </div>
  )
}

export default About