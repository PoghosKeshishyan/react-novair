import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { From } from './From';
import { To } from './To';
import { Calendar } from './Calendar';
import { Passangers } from './Passangers';
import axios from '../../../axios';
import './BookingSearch.css';

export function BookingSearch({ bookingData }) {
  // console.log(bookingData);

  const [bookingPostData, setBookingPostData] = useState({
    "from_here": "",
    "to_there": "",
    "flight_airport_name": "",
    "flight_airport_short_name": "",
    "arrival_airport_name": "",
    "arrival_airport_short_name": "",
    "departure_date": null,
    "return_date": null,
    "adult_count": 1,
    "child_count": 0,
    "baby_count": 0
  });

  const navigate = useNavigate();

  const onChangeBookingPostData = (updates) => {
    setBookingPostData(prev => ({ ...prev, ...updates }));
  };

  const handlerSearchBtn = async () => {
    try {
      // const res = await axios.post('search-flights/', bookingData);
      // sessionStorage.setItem('bookingSearchResult', JSON.stringify(res.data));
      // navigate('/booking')
      // console.log(res.data);
      // sessiayum nayev pahel vor passaigneri qanak@ aranc beybii
    } catch (error) {
      alert(error.response.data['am']);
    }
  };

  const calculatePassangersCount = () => {
    return bookingPostData.adult_count + bookingPostData.child_count + bookingPostData.baby_count;
  };

  // useEffect(() => { console.log(bookingPostData); }, [bookingPostData])

  return (
    <div className='BookingSearch'>
      <div className="container">
        <div className="row flex-between">
          <From
            bookingPostData={bookingPostData}
            from_directions={bookingData.directions.from_here}
            bookingFields={bookingData.bookingFields}
            onChangeBookingPostData={onChangeBookingPostData}
          />

          <To
            bookingPostData={bookingPostData}
            to_directions={bookingData.directions.to_there}
            bookingFields={bookingData.bookingFields}
            onChangeBookingPostData={onChangeBookingPostData}
          />

          <Calendar
            bookingFields={bookingData.bookingFields}
            onChangeBookingPostData={onChangeBookingPostData}
          />

          <Passangers
            calculatePassangersCount={calculatePassangersCount}
            bookingFields={bookingData.bookingFields}
            bookingPostData={bookingPostData}
            onChangeBookingPostData={onChangeBookingPostData}
          />

          <button className='btn' onClick={handlerSearchBtn}>Search</button>
        </div>
      </div>
    </div>
  )
}