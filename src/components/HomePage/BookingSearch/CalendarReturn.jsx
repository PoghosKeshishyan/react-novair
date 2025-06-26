import { useContext, useState } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import Flatpickr from "react-flatpickr";
import { Armenian } from "flatpickr/dist/l10n/hy.js";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import { English } from "flatpickr/dist/l10n/default.js";
import "flatpickr/dist/themes/material_blue.css";

export function CalendarReturn({ bookingFields, departureDate, onChangeBookingPostData }) {
    const { currentLang } = useContext(LanguageContext);
    const [selectedDate, setSelectedDate] = useState(null);
    const calendarData = bookingFields?.calendar_field_list?.[0];

    const getLocale = () => {
        switch (currentLang) {
            case "am": return Armenian;
            case "ru": return Russian;
            case "en":
            default: return English;
        }
    };

    const formatDate = (date) =>
        date.toLocaleDateString(currentLang === "am" ? "hy-AM" :
                              currentLang === "ru" ? "ru-RU" : "en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });

    const getMinDate = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (!departureDate) return today;
        
        const departure = new Date(departureDate);
        departure.setDate(departure.getDate() + 1); // Ավելացնում ենք 1 օր
        departure.setHours(0, 0, 0, 0);
        
        return departure > today ? departure : today;
    };

    const handleDateChange = ([date]) => {
        if (date instanceof Date && !isNaN(date)) {
            const iso = date.toISOString().split("T")[0];
            setSelectedDate({ iso, formatted: formatDate(date) });
            onChangeBookingPostData({ return_date: iso });
        }
    };

    const handleClear = () => {
        setSelectedDate(null);
        onChangeBookingPostData({ return_date: null });
    };

    return (
        <div className="Calendar">
            <p className="title">{calendarData?.return_field_text}</p>

            <div className="info flex-center">
                <img src="/images/calendar.svg" alt="calendar" className="calendar-icon" />

                <Flatpickr
                    options={{
                        dateFormat: "d.m.Y",
                        minDate: getMinDate(), 
                        locale: getLocale(),
                        disableMobile: true
                    }}
                    value={selectedDate?.iso ? new Date(selectedDate.iso) : ''}
                    placeholder={bookingFields.select_field_text}
                    onChange={handleDateChange}
                    className="flatpickr-input return"
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