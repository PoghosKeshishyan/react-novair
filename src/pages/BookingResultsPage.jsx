import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Guide } from "../components/BookingResultsPage/Guide";
import { FlightDateSlider } from "../components/BookingResultsPage/FlightDateSlider";
import { FlightTickets } from '../components/BookingResultsPage/FlightTickets';
import { ReturnDateSlider } from "../components/BookingResultsPage/ReturnDateSlider";
import { ReturnTickets } from "../components/BookingResultsPage/ReturnTickets";
import '../stylesheets/BookingResultsPage.css';

export function BookingResultsPage() {
  const [bookingSearchResults, setBookingSearchResults] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const sessionData = JSON.parse(sessionStorage.getItem('bookingSearchResult'));
    setBookingSearchResults(sessionData || {});
  }, []);

  const navigate = useNavigate();

  return bookingSearchResults && (
    <div className="BookingResultsPage container">
      <Guide />

      {/* flight information */}
      <FlightDateSlider />
      <FlightTickets departure_flights={bookingSearchResults.departure_flights} />

      {
        bookingSearchResults.return && (
          <>
            {/* return related information */}
            <ReturnDateSlider />
            <ReturnTickets />
          </>
        )
      }

      <div className="continue_btn" onClick={() => navigate('/booking/check-baggage')}>
        <button>Continue</button>
      </div>
    </div>
  )
}