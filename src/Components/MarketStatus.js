import React from 'react';
import './MarketStatus.css';

const MarketStatus = () => {
  const date = new Date();
  const currentDay = date.getDay();
  const currentDate = date.getDate();
  const month = date.getMonth();
  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const monthName = monthNames[month];
  const openingTime = 8; // Market opens at 08:00
 //console.log( "rendered")
  let isMarketClosed = true;
  let openingDate = currentDate;

  if (currentDay === 5 && date.getHours() >= 17) {
    isMarketClosed = false;
    openingDate += 3;
  } else if (currentDay === 6 || (currentDay === 5 && date.getHours() < 17)) {
    isMarketClosed = false;
    openingDate += (currentDay === 6) ? 2 : 1;
  } else if (date.getHours() < openingTime) {
    openingDate += 0;
  } else {
    openingDate += 1;
  }

  return (
    <div>
      <div>Market Status</div>
      {isMarketClosed ?<marquee behavior="" direction=""  Scrollamount={30}> Market closed - opens at {openingTime}:00 on {openingDate} {monthName}</marquee>
         
      :(
        <div className="marquee">
          Market closed - opens at {openingTime}:00 on {openingDate} {monthName}
        </div>
      ) }
    </div>
  );
};

export default MarketStatus;
