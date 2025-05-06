import { useEffect, useState } from 'react';
import { ClientInfoForm } from '../components/BookingClientInfoPage/ClientInfoForm';
import { OrderSummary } from '../components/OrderSummary/OrderSummary';
import { BookingNavigation } from '../components/BookingNavigation/BookingNavigation';
import '../stylesheets/BookingClientInfoPage.css';

export function BookingClientInfoPage() {
  const [flightSeats, setFlightSeats] = useState([
    { id: 'id-c1', seat_number: 'C1', is_taken: false },
    { id: 'id-c2', seat_number: 'C2', is_taken: false },
    { id: 'id-c3', seat_number: 'C3', is_taken: true },
    { id: 'id-c4', seat_number: 'C4', is_taken: false },
    { id: 'id-c5', seat_number: 'C5', is_taken: false },
    { id: 'id-c6', seat_number: 'C6', is_taken: false },
    { id: 'id-b1', seat_number: 'B1', is_taken: true },
    { id: 'id-b2', seat_number: 'B2', is_taken: false },
    { id: 'id-b3', seat_number: 'B3', is_taken: false },
    { id: 'id-b4', seat_number: 'B4', is_taken: false },
    { id: 'id-b5', seat_number: 'B5', is_taken: true },
    { id: 'id-b6', seat_number: 'B6', is_taken: false },
    { id: 'id-a1', seat_number: 'A1', is_taken: false },
    { id: 'id-a2', seat_number: 'A2', is_taken: false },
    { id: 'id-a3', seat_number: 'A3', is_taken: false },
    { id: 'id-a4', seat_number: 'A4', is_taken: true },
    { id: 'id-a5', seat_number: 'A5', is_taken: false },
  ]);

  const [isAnySeatTaken, setIsAnySeatTaken] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChangeFlightSeats = (id) => {
    const newData = flightSeats.map(elem => {
      return {
        ...elem,
        is_selected: elem.id === id, 
      };
    });
  
    setFlightSeats(newData);
  };

  const submitFlightSeatTaken = (currentSeat) => {
    alert(`Duq hajoxutyamb amragreciq ${currentSeat.seat_number} նստատեղը:`);
    setIsAnySeatTaken(true);
    window.location.reload();
  };

  return (
    <div className="BookingClientInfoPage">
      <BookingNavigation active_section={1} />

      <div className="page-row container">
        <ClientInfoForm
          flightSeats={flightSeats}
          isAnySeatTaken={isAnySeatTaken}
          onChangeFlightSeats={onChangeFlightSeats}
          submitFlightSeatTaken={submitFlightSeatTaken}
        />

        <OrderSummary
          next_page={'/booking/payment'}
          action_btn={'go-to-next-page'}
          btn_text={'Continue'}
        />
      </div>
    </div>
  );
}
