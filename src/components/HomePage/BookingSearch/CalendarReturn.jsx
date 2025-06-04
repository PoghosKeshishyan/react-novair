import { useRef, useState } from "react";

export function CalendarReturn({ bookingFields, departureDate, onChangeBookingPostData }) {
    const [visibleDate, setVisibleDate] = useState('');
    const dateInputRef = useRef(null);
    const calendarData = bookingFields.calendar_field_list[0];

    const handleClick = (e) => {
        if (e.target.classList?.contains('return') && dateInputRef.current) {
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
        onChangeBookingPostData({ return_date: value });
    };

    return (
        <div className="Calendar">
            <p className="title">{calendarData.return_field_text}</p>

            <div className="info flex-center" onClick={handleClick}>
                <img src="/images/calendar.svg" alt="calendar" className="return" />

                {/* Hidden real date input */}
                <input
                    type="date"
                    className="return"
                    ref={dateInputRef}
                    onChange={handleChange}
                    min={departureDate || new Date().toISOString().split("T")[0]}
                />

                {/* Visible display for user */}
                <span className="return">{visibleDate || bookingFields.select_field_text}</span>
            </div>
        </div>
    );
}
