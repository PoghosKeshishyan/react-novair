import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../../context/LanguageContext';
import { From } from './From';
import { To } from './To';
import { Calendar } from './Calendar';
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

      console.log(bookingPostData);
      const res = await axios.post('search-flights/', bookingPostData);
      console.log(res.data);
      
      // sessionStorage.setItem('bookingSearchResult', JSON.stringify(res.data));
      // navigate('/booking')
      // sessiayum nayev pahel vor passaigneri qanak@ aranc beybii
    } catch (error) {
      alert(error.response.data[currentLang]);
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

          <Calendar
            bookingFields={bookingData.bookingFields}
            onChangeBookingPostData={onChangeBookingPostData}
          />

          <Passangers
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