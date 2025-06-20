import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../../context/LanguageContext';
import { From } from './From';
import { To } from './To';
import { CalendarDeparture } from './CalendarDeparture';
import { CalendarReturn } from './CalendarReturn';
import { Passangers } from './Passangers';
import axios from '../../../axios';
import './BookingSearch.css';

export function BookingSearch({ bookingData }) {
  const { currentLang } = useContext(LanguageContext);
  const navigate = useNavigate();

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

  const onChangeBookingPostData = (updates) => {
    setBookingPostData(prev => ({ ...prev, ...updates }));
  };

  const handlerSearchBtn = async () => {
    const responseObject = {
      en: "Please fill in all the fields.",
      ru: "Пожалуйста, заполните все поля.",
      am: "Խնդրում ենք լրացնել բոլոր դաշտերը։",
    };

    try {
      if (
        !bookingPostData.from_here ||
        !bookingPostData.to_there ||
        !bookingPostData.departure_date
      ) {
        return alert(responseObject[currentLang]);
      }

      const res = await axios.post('search-flights/', bookingPostData);
      sessionStorage.setItem('bookingSearchResult', JSON.stringify(res.data));
      sessionStorage.setItem('bookingPostData', JSON.stringify(bookingPostData));
      navigate('/booking')
    } catch (error) {
      alert(error.response.data[currentLang]);
      console.log(error);
      
    }
  };

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

          <CalendarDeparture
            bookingFields={bookingData.bookingFields}
            onChangeBookingPostData={onChangeBookingPostData}
          />

          <CalendarReturn
            departureDate={bookingPostData.departure_date}
            bookingFields={bookingData.bookingFields}
            onChangeBookingPostData={onChangeBookingPostData}
          />

          <Passangers
            bookingFields={bookingData.bookingFields}
            bookingPostData={bookingPostData}
            onChangeBookingPostData={onChangeBookingPostData}
          />
          
          <button className='btn' onClick={handlerSearchBtn}>{bookingData.bookingFields.search_btn_text}</button>
        </div>
      </div>
    </div>
  )
}