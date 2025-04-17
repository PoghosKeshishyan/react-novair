import { useNavigate } from "react-router-dom";
import { Guide } from "../components/BookingResultsPage/Guide";
import { FlightDateSlider } from "../components/BookingResultsPage/FlightDateSlider";
import { FlightTickets } from '../components/BookingResultsPage/FlightTickets';
import { ReturnDateSlider } from "../components/BookingResultsPage/ReturnDateSlider";
import { ReturnTickets } from "../components/BookingResultsPage/ReturnTickets";
import '../stylesheets/BookingResultsPage.css';

export function BookingResultsPage() {
  const navigate = useNavigate();

  return (
    <div className="BookingResultsPage container">
      <Guide />

      {/* flight information */}
      <FlightDateSlider />
      <FlightTickets />

      {/* return related information */}
      <ReturnDateSlider />
      <ReturnTickets />

      <div className="continue_btn" onClick={() => navigate('/booking')}>
        <button>Continue</button>
      </div>
    </div>
  )
}
