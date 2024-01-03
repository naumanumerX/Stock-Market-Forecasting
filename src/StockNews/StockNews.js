import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StockNews.css";

const StockNews = ({stockSymbol}) => {
  const apiToken = "aLirJmDJWupEK98c99PMti07eu4hzjsHvhm0NUhF";
  const symbols = ['IBM', 'MSFT', 'AAPL', 'TSLA', 'GOOG', 'META', 'LLY'];
  const randomIndex = Math.floor(Math.random() * symbols.length);
  const sSymbol = symbols[randomIndex];

  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.marketaux.com/v1/news/all?api_token=${apiToken}&symbols=${sSymbol}`
        );
       // console.log("news", response.data.data);
        setNews(response.data.data);
      } catch (error) {
        console.error("Cannot fetch news data of this stock", error);
      }
    };

    fetchData();
  }, [stockSymbol]);

  return (
    <div>
      <h1>Stock news</h1>
      <div className="main">
        {news.length > 0 ? (
          news.map((element) => (
            <div className="card" key={element.uuid} style={{ width: "300px", height: "420px", marginTop: "2rem", marginLeft: "2em" }}>
              <img src={element.image_url} className="card-img-top" alt={element.source} />
              <div className="card-body">
                <h5 className="card-title"><b>{element.source}</b></h5>
                <p className="card-text">
                  {element.description.split(" ").slice(0, 20).join(" ")}
                </p>
               
                <a href={element.url} target="_blank" rel="noopener noreferrer" className="block mt-8 mx-auto text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Read More
</a>



              </div>
            </div>
          ))
        ) : (
          <p>No news available</p>
        )}
      </div>
    </div>
  );
};

export default StockNews;
