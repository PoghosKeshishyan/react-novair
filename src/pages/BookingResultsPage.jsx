import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from '../context/LanguageContext';
import { Guide } from "../components/BookingResultsPage/Guide";
import { FlightDateSlider } from "../components/BookingResultsPage/FlightDateSlider";
import { FlightTickets } from '../components/BookingResultsPage/FlightTickets';
import { ReturnDateSlider } from "../components/BookingResultsPage/ReturnDateSlider";
import { ReturnTickets } from "../components/BookingResultsPage/ReturnTickets";
import axios from '../axios';
import dayjs from 'dayjs';
import '../stylesheets/BookingResultsPage.css';

export function BookingResultsPage() {
  const [bookingResultsPageLabel, setBookingResultsPageLabel] = useState(null);
  const [bookingSearchResults, setBookingSearchResults] = useState(null);
  const [flagForFlightTickets, setFlagForFlightTickets] = useState(true);
  const { currentLang } = useContext(LanguageContext);

  useEffect(() => {
    const sessionData = JSON.parse(sessionStorage.getItem('bookingSearchResult'));
    setBookingSearchResults(sessionData);

    const loadingData = async () => {
      const resBookingLabel = await fetch('http://localhost:8000/booking_results_page_label?lang=' + currentLang)
      const res = await resBookingLabel.json();
      setBookingResultsPageLabel(res[0]);
    }

    window.scrollTo(0, 0);
    loadingData();
  }, [currentLang]);

  const navigate = useNavigate();

  const handleCalendarDays = async (direction, date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const newBookingPostData = { ...bookingSearchResults.departure_flights[0], [direction]: formattedDate };

    try {
      const res = await axios.post('search-flights/', newBookingPostData);
      setBookingSearchResults(res.data);
      setFlagForFlightTickets(true);
    } catch (error) {
      alert(error.response.data[currentLang]);
      setFlagForFlightTickets(false);
    }
  };

  return bookingResultsPageLabel && (
    <div className="BookingResultsPage container">
      <Guide guide_label={bookingResultsPageLabel.navigation} />


      {/* flight information */}
      <FlightDateSlider
        departure_flights={bookingSearchResults.departure_flights}
        handleCalendarDays={handleCalendarDays}
      />

      {flagForFlightTickets && <FlightTickets departure_flights={bookingSearchResults.departure_flights} />}


      {/* return related information */}
      {
        bookingSearchResults.return_flights && (
          <>
            <ReturnDateSlider return_flights={bookingSearchResults.return_flights} />
            <ReturnTickets return_flights={bookingSearchResults.return_flights} />
          </>
        )
      }


      <div className="continue_btn" onClick={() => navigate('/booking/check-baggage')}>
        <button>Continue</button>
      </div>
    </div>
  )
}