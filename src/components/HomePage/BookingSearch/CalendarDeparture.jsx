import { useRef, useState } from "react";

export function CalendarDeparture({ bookingFields, onChangeBookingPostData }) {
    const [visibleDate, setVisibleDate] = useState('');
    const dateInputRef = useRef(null);
    const calendarData = bookingFields.calendar_field_list[0];

    const handleClick = (e) => {
        if (e.target.classList?.contains('departure') && dateInputRef.current) {
            dateInputRef.current.showPicker?.();
            dateInputRef.current.focus();
        }
    };

    const handleChange = (e) => {
        const value = e.target.value; // YYYY-MM-DD
        const date = new Date(value);

        const formatted = date.toLocaleDateString("hy-AM", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        setVisibleDate(formatted); // DD.MM.YYYY
        onChangeBookingPostData({ departure_date: value });
    };

    return (
        <div className="Calendar">
            <p className="title">{calendarData.departure_field_text}</p>

            <div className="info flex-center" onClick={handleClick}>
                <img src="/images/calendar.svg" alt="calendar" className="departure" />

                {/* Hidden real date input */}
                <input
                    type="date"
                    className="departure"
                    ref={dateInputRef}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                />

                {/* Visible display for user */}
                <span className="departure">{visibleDate || bookingFields.select_field_text}</span>
            </div>
        </div>
    );
}
