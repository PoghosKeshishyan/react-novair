import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './ReturnDateSlider.css';

export function ReturnDateSlider({ return_flights }) {
  const [startDate, setStartDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [daysVisible, setDaysVisible] = useState(getDaysVisible());

  function getDaysVisible() {
    const width = window.innerWidth;

    if (width >= 1200) return 10;
    if (width >= 930) return 8;
    if (width >= 740) return 6;
    if (width >= 640) return 5;
    if (width >= 530) return 4;
    if (width >= 400) return 3;

    return 2;
  }

  useEffect(() => {
    const handleResize = () => {
      setDaysVisible(getDaysVisible());
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getDates = () => {
    return Array.from({ length: daysVisible }, (_, i) => startDate.add(i, 'day'));
  };

  const goLeft = () => {
    setStartDate(startDate.subtract(1, 'day'));
  };

  const goRight = () => {
    setStartDate(startDate.add(1, 'day'));
  };  

  return (
    <div className="ReturnDateSlider">
      <div className="flight-header">
        <img src="/images/plane-arrive.svg" alt="plane-arrive" />
        {return_flights[0].from_here} - {return_flights[0].to_there}
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