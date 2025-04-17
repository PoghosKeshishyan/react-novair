import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { From } from './From';
import { To } from './To';
import { Calendar } from './Calendar';
import { Passangers } from './Passangers';
import './BookingSearch.css';

export function BookingSearch() {
  const [bookingData, setBookingData] = useState({
    from: "",
    to: "",
    date: "",
    passangers: 0
  });
  
  const navigate = useNavigate();

  return (
    <div className='BookingSearch'>
      <div className="container">
        <div className="row flex-between">
          <From from={bookingData.from} setBookingData={setBookingData} />
          <To to={bookingData.to} setBookingData={setBookingData} />
          <Calendar date={bookingData.date} setBookingData={setBookingData} />
          <Passangers passangers={bookingData.passangers} setBookingData={setBookingData} />
          <button className='btn' onClick={() => navigate('/booking')}>Search</button>
        </div>
      </div>
    </div>
  )
}