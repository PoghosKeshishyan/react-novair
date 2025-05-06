import { useNavigate } from 'react-router-dom';
import { From } from './From';
import { To } from './To';
import { Calendar } from './Calendar';
import { Passangers } from './Passangers';
import axios from '../../../axios';
import './BookingSearch.css';

export function BookingSearch({ bookingData, setBookingData }) {
  const navigate = useNavigate();

  const handlerSearchBtn = async () => {
    try {
      const res = await axios.post('search-flights/', bookingData);
      sessionStorage.setItem('bookingSearchResult', JSON.stringify(res.data));

      console.log(res);

      // navigate('/booking')
    } catch (error) {
      alert(error.response.data['am']);
    }
  }

  return (
    <div className='BookingSearch'>
      <div className="container">
        <div className="row flex-between">
          <From from={bookingData.from} setBookingData={setBookingData} />
          <To to={bookingData.to} setBookingData={setBookingData} />
          <Calendar bookingData={bookingData} setBookingData={setBookingData} />
          <Passangers bookingData={bookingData} setBookingData={setBookingData} />
          <button className='btn' onClick={handlerSearchBtn}>Search</button>
        </div>
      </div>
    </div>
  )
}