import React, { useState } from 'react';
import './FAQ.css'; // Import your CSS file for styling

const FAQ = () => {
  const faqData = [
    {
      question: 'How can I view historical data on the stock market web app?',
      answer:
        'You can access historical data by navigating to the "Historical Data" section. Enter a custom date range, and the app will display the corresponding candlestick chart for that period.',
    },
    {
      question: 'What is the process for selecting a custom date for historical data?',
      answer:
        'Simply go to the "Custom Date" option in the historical data section and choose the desired start and end dates using the date picker.',
    },
    

    {question: "Can I get predictions for a specific stock?",
    answer: 'Yes, you can get stock predictions by using the "Stock Search" feature. Enter the stock symbol or name, and the app will provide predictions based on historical data and market trends.'
    },
   
    {question:" How do I check the top risers and fallers of the previous days?",
    answer:'The "Top Gainers" and "Top Losers" sections on the app homepage will display the stocks that experienced the most significant gains and losses in the previous days.'
    },
    {
    question:' Where can I find news related to the stock market?',
    answer: 'ou can stay informed about the latest news in the "Market News" section. It provides updates on market trends, stock analyses, and relevant news impacting the financial world.'
    },
    {
    question: 'How can I access company information for a specific stock?',
    answer: 'To view detailed information about a company, use the "Company Information" feature. Enter the stock symbol or name, and the app will provide comprehensive details about the selected company.'
    },
    {
    question: 'Is there a FAQ section to help with common queries?',
    answer: 'Yes, you can find answers to common queries in the "FAQs" section. It covers a range of topics to assist users in navigating and understanding the features of the stock market web app.'
    },
    {
    question: 'How accurate are the stock predictions provided by the app?',
    answer: "Stock predictions are based on historical data and market trends. While they can offer insights, it's important to note that they are not guaranteed. The stock market is influenced by various factors, and predictions should be used as supplementary information."
    }
    ,{

    question: 'Can I customize the candlestick chart for a more detailed analysis?',
    answer:' Absolutely! The candlestick chart in the "Historical Data" section can be customized to adjust time intervals and other parameters, allowing for a more detailed and personalized analysis.'
    },

   { question: 'How frequently is the app updated with the latest stock market data?',
    answer: 'The app is regularly updated with real-time and historical data to ensure users have access to the latest information. The frequency of updates ensures the accuracy and relevance of the displayed data.'
    
   }














  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    
    <div className="faq-container">
      {faqData.map((faq, index) => (
        <div className="question" key={index} onClick={() => toggleAnswer(index)}>
          <h2>{faq.question}</h2>
          <p className={`answer ${openIndex === index ? 'open' : ''}`}>{faq.answer}</p>
          <span className={`arrow ${openIndex === index ? 'upside-down' : ''}`}></span>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
