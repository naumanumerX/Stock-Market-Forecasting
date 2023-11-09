import React from 'react'
import { useEffect,useState,useRef } from 'react'

import { addDays } from 'date-fns'
import {DateRange} from 'react-date-range'
import format from 'date-fns/format'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import './DataRangePicker.css'
const DataRangePicker = ({range,setRange}) => {
    
   
        const [open,setOpen]=useState(false);
        const refone=useRef(null);
        useEffect(()=>{
            document.addEventListener("click",hidenOnClick,true)
        },[])
        const hidenOnClick = (e) => {
            if (refone.current && !refone.current.contains(e.target)) {
                setOpen(false);
            }
        }

             // console.log("date is ", format(range,'MM/dd/yyy'))
      
        
    return (
        <>
        <h1>Date Range Picker</h1>
        
        <div className="calendarWrap">
            <input 
          //  value={`${format(range[0].startDate,"MM/dd/yyyy")} -${format(range[0].endDate,"MM/dd/yyyy")}`}
            value={`${format(range[0].startDate, 'MM/dd/yyyy')} - ${format(range[0].endDate, 'MM/dd/yyyy')}`}
            readOnly
            className='inputBox'
            onClick={() => setOpen(!open)}
            
            />

<div ref={refone}>
    {open && (
        <DateRange
            onChange={item => setRange([item.selection])}
            editableDateInputs={false}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction='horizontal'
            className='calenderElement'
        />
    )}
</div>
        </div>
        
        
        </>
    )
}

export default DataRangePicker