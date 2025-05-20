import { useNavigate } from 'react-router-dom';
import './OrderSummary.css';

export function OrderSummary({ next_page, selectedFlights, action_btn, btn_text, orderSummary, baggage10kg }) {
  const navigate = useNavigate();

  const calculateSumOfTickets = () => {
    let tickets;

    if (selectedFlights.return) {
      tickets = [...selectedFlights.flight.tickets, ...selectedFlights?.return?.tickets];
    } else {
      tickets = selectedFlights.flight.tickets;
    }

    const sum = tickets.reduce((acc, elem) => acc + +elem.price, 0);
    return sum;
  };

  calculateSumOfTickets();

  const handler_btn = () => {
    if (action_btn === 'go-to-next-page') {
      if (next_page === '/booking/client-info') {
        sessionStorage.setItem('baggage10kg', JSON.stringify(baggage10kg));
      }

      navigate(next_page);
    } else if (action_btn === 'payment') {
      alert('Գնումը հաջողությամբ կատարվեց');
    }
  };

  return (
    <div className='OrderSummary'>
      <h2 className='title'>{orderSummary.title}</h2>

      <div className="directions">
        <div className='box'>
          <div className="row flex-center">
            <img src="/images/plane-flight.svg" alt="plane-flight" />
            <p className='route'>{selectedFlights.flight.from_here} - {selectedFlights.flight.to_there}</p>
          </div>

          <p className='date-time'>{selectedFlights.flight.departure_date} • {selectedFlights.flight.departure_time}</p>
        </div>

        {selectedFlights?.return && <div className='box'>
          <div className="row flex-center">
            <img src="/images/plane-arrive.svg" alt="plane-flight" />
            <p className='route'>{selectedFlights.return.from_here} - {selectedFlights.return.to_there}</p>
          </div>

          <p className='date-time'>{selectedFlights.return.departure_date} • {selectedFlights.return.departure_time}</p>
        </div>}
      </div>

      <div className="sub-total">
        <h3 className='title'>{orderSummary.sub_total_text_field}</h3>

        <p className='flex-between'>
          <span className='text'>{orderSummary.quantity_text_field}</span>
          <span className='result'>{selectedFlights.flight.tickets[0].price} ֏</span>
        </p>

        <p className='flex-between'>
          <span className='text'>{orderSummary.seat_text_field}</span>
          <span className='result'>0 ֏</span>
        </p>
      </div>

      <div className="total flex-between">
        <p className="text">{orderSummary.total_text_field}</p>
        <p className="result">{calculateSumOfTickets()} ֏</p>
      </div>

      <button onClick={handler_btn} className='order-summary-btn'>{btn_text}</button>
    </div>
  )
}