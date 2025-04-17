import { useState } from 'react';
import dayjs from 'dayjs';
import './FlightDateSlider.css';

export function FlightDateSlider() {
  const [startDate, setStartDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const DAYS_VISIBLE = 10;

  const getDates = () => {
    return Array.from({ length: DAYS_VISIBLE }, (_, i) => startDate.add(i, 'day'));
  };

  const goLeft = () => {
    setStartDate(startDate.subtract(1, 'day'));
  };

  const goRight = () => {
    setStartDate(startDate.add(1, 'day'));
  };

  return (
    <div className="FlightDateSlider">
      <div className="flight-header">
        <img src="/images/bookingSearch/plane-flight.svg" alt="plane-flight" />
        Yerevan - Jakarta
      </div>

      <div className="flight-slider">
        <img src="/images/blue-right-arrow.svg" alt="blue-right-arrow" onClick={goLeft} />

        <div className="date-list">
          {getDates().map((date, index) => (
            <div
              key={index}
              className={`date-item ${date.isSame(selectedDate, 'day') ? 'selected' : ''}`}
              onClick={() => setSelectedDate(date)}
            >
              <div className="day">{date.format('ddd')}</div>
              <div className="date">{date.format('DD/MM/YYYY')}</div>
            </div>
          ))}
        </div>

        <img src="/images/blue-left-arrow.svg" alt="blue-left-arrow" onClick={goRight} />
      </div>

    </div>
  );
}