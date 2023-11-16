
import dayjs from "dayjs"
export const candleStickOptions=(stockSymbol)=>{

  return {
    chart: {
      
      //height: '200px' , 
      type: 'candlestick'
    },
    title: {
      text: `CandleStick Chart -LLOY`,
      align: 'left'
    },
    annotations: {
      xaxis: [
        {
          x: 'Nov 07 14:00',
          borderColor: '#00E396',
          label: {
            borderColor: '#00E396',
            style: {
              fontSize: '12px',
              color: '#fff',
              background: '#00E396'
            },
            orientation: 'horizontal',
            offsetY: 7,
            text: 'Annotation Test'
          }
        }
      ]
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter: function(val) {
          return dayjs(val).format('MMM DD HH:mm')
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  }
  }
