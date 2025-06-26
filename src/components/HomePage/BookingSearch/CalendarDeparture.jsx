import { useContext, useState } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import Flatpickr from "react-flatpickr";
import { Armenian } from "flatpickr/dist/l10n/hy.js";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import { English } from "flatpickr/dist/l10n/default.js";
import "flatpickr/dist/themes/material_blue.css";

export function CalendarDeparture({ bookingFields, onChangeBookingPostData }) {
    const { currentLang } = useContext(LanguageContext);
    const [selectedDate, setSelectedDate] = useState(null);
    const calendarData = bookingFields?.calendar_field_list?.[0];

    const getLocale = () => {
        switch (currentLang) {
            case "am":
                return Armenian;
            case "ru":
                return Russian;
            case "en":
            default:
                return English;
        }
    };

    const handleDateChange = ([date]) => {
        if (date) {
            const isoString = date.toISOString().split("T")[0];
            setSelectedDate(date); // Պահպանում ենք Date օբյեկտը
            onChangeBookingPostData({ departure_date: isoString });
        }
    };

    const handleClear = () => {
        setSelectedDate(null);
        onChangeBookingPostData({ departure_date: "" });
    };

    return (
        <div className="Calendar">
            <p className="title">{calendarData?.departure_field_text}</p>

            <div className="info flex-center">
                <img src="/images/calendar.svg" alt="calendar" className="calendar-icon" />

                <Flatpickr
                    options={{
                        dateFormat: "d.m.Y",
                        minDate: "today",
                        locale: getLocale(),
                        disableMobile: true 
                    }}
                    value={selectedDate || ''} 
                    placeholder={bookingFields.select_field_text}
                    onChange={handleDateChange}
                    className="flatpickr-input departure"
                    readOnly 
                />

                {selectedDate && (
                    <button
                        type="button"
                        className="clear-btn"
                        onClick={handleClear}
                        title="Clear date"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}