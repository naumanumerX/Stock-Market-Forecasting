import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Slideshow.css';

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '40vh',
  width: '65vw',
};
const slide={

  width: '65vw',
  height: '40vh',
  overflow:"hidden"
}
const slideImages = [
  {
    url: 'https://media.istockphoto.com/id/1487894858/photo/candlestick-chart-and-data-of-financial-market.webp?s=1024x1024&w=is&k=20&c=AfDUACB1NMYPpuvEgEgQDUNt2rMuCsPoLnfH0LSYs1s=',
  },
  {
    url: 'https://media.istockphoto.com/id/1487894858/photo/candlestick-chart-and-data-of-financial-market.webp?s=1024x1024&w=is&k=20&c=AfDUACB1NMYPpuvEgEgQDUNt2rMuCsPoLnfH0LSYs1s=',
  },
  {
    url: 'https://media.istockphoto.com/id/1358927461/photo/currency-and-exchange-stock-chart-for-finance-and-economy-display.jpg?s=1024x1024&w=is&k=20&c=QFm1NREPQALqFqoymVB1ARrYaMvd-vprc35VZgukz50=',
  },

];

const Slideshow = () => {
  return (
    <div   style={{...slide}}>
      <Slide
        autoplay={true}
        duration={1000}
        prevArrow={<div style={{ visibility: 'hidden' }} />}
        nextArrow={<div style={{ visibility: 'hidden' }} />}
      >
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
