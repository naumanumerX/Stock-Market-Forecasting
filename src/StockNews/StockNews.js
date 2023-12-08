import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StockNews.css"

const StockNews = () => {
  //const api_key = "WVA7522VPWWOJAVA";
  const apiToken="aLirJmDJWupEK98c99PMti07eu4hzjsHvhm0NUhF";
  const stockSymbol = "TSLA,AAPL,AMZN";
  const [news, setNews] = useState([]);

  const apiCall = async (stockSymbol, apiToken) => {
    // const response = await axios.get(
    //   `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${stockSymbol}&apikey=${api_key}`
    // );

    // console.log(response.data.feed);

     // Replace with the symbols you are interested in

    try {
    const response = await axios.get(
      `https://api.marketaux.com/v1/news/all?api_token=${apiToken}&symbols=${stockSymbol}`

      );
      console.log("news",response.data.data)
    setNews(response.data.data);
    }
    catch{
      console.log("CAnnot feetch news data of this stock")
    }
  };

  useEffect(() => {
    apiCall(stockSymbol, apiToken);
  }, [stockSymbol]);

  return (
    <div>
      <h1>Stock news</h1>
      <div className="main">
        
      {news.map((element) => {
        return (
          <>
          
           <div className="card" key={element.uuid} style={{ width: "300px", height:"420px", marginTop:"2rem", marginLeft:"2em"}}>
              <img src={element.image_url} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title"><b>{element.source}</b></h5>
                <p className="card-text">
                 {/* {element.summary.split(" ").slice(0,20).join(" ")} */}
                 {element.description.split(" ").slice(0,20).join(" ")}
                </p>
                <a href={element.url} target="_blank" className="btn btn-primary">
                  Read More
                </a>
              </div>
            </div>
          
          </>
        );
      })}
       </div>

    

    </div>
  );
};

export default StockNews;
