import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Calendar({ bookingFields, onChangeBookingPostData }) {
  const today = new Date();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const calendarData = bookingFields.calendar_field_list[0]

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutSide);
  }, []);

  const handleClickOutSide = (e) => {
    try {
      if (!dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    } catch { }
  }

  const handleChange = (dates) => {
    const [start, end] = dates;

    setStartDate(start instanceof Date ? start : null);
    setEndDate(end instanceof Date ? end : null);

    const updatedDates = {
      departure_date: start.toLocaleDateString().split('.').reverse().join('-'),
      return_date: end ? end.toLocaleDateString().split('.').reverse().join('-') : null,
    };

    onChangeBookingPostData(updatedDates);
  };

  return (
    <div className="Calendar" ref={dropdownRef} onClick={() => setShowDropdown(true)}>
      <p className="title">{ bookingFields.date_field_text }</p>

      <div className="info flex-center">
        <img src="/images/calendar.svg" alt="calendar" />
        <span>
          {startDate ? startDate.toLocaleDateString() : bookingFields.select_field_text}
          {endDate && ` - ${endDate.toLocaleDateString()}`}
        </span>
      </div>

      {showDropdown && <div className="CalendarDropdown" onClick={(e) => e.stopPropagation()}>
        <div className="calendar-header">
          <div className="left side">
            <p className="text">{calendarData.departure_field_text}</p>
            <p className="date">{startDate ? startDate.toLocaleDateString() : "Select"}</p>
          </div>

          <div className="right side">
            <p className="text">{endDate && calendarData.return_field_text}</p>
            <p className="date">{endDate ? endDate.toLocaleDateString() : <span>{calendarData.one_way_ticket_btn_text}</span>}</p>
          </div>
        </div>

        <DatePicker
          selected={startDate}
          onChange={handleChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          minDate={today}
        />
        
        <div className="clb"><button className="btn calendar" onClick={() => setShowDropdown(false)}>
          {calendarData.btn_text} 
        </button></div>
      </div>}

    </div>
  )
}