import React from 'react'
import './MarketStatus.css'

const MarketStatus = () => {

    const date= new Date();
    const currentDate = date.getDay();
    let status=true;
    let openDate=date.getDate();
    const month=date.getMonth();
    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ];

      const monthName=monthNames[month];
     // console.log("currentdate",currentDate)
        let time = date.getHours();
       
        console.log("hour", time);
    
      
   
    if (currentDate == 6 ) {
      status=false;
        openDate += 2;
      } else if (currentDate == 7) {
        status=false;
        openDate += 1;
        
      }
      else if(currentDate==5&&time>=17){
        status=false;
        openDate+=3;
      }
      else{
        openDate+=0;
      }
      
  
    console.log("open date",openDate)
   console.log("date",currentDate);


  return (
    <div>
    

    <div>Market Status</div>
    {!status && (
        <div className="marquee">
          Market closed - opens at 08:00 on {openDate} {monthName}
        </div>
      )}
   


    </div>
  )
}

export default MarketStatus