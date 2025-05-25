import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrderSummary.css';

export function OrderSummary({
  next_page,
  selectedFlights,
  orderSummary,
  action_btn,
  btn_text,
  isClientInfoValid,
  calculatePriceSumOfSeats,
  currentLang,
  passangerList,
  paymentAgreements,
}) {
  const navigate = useNavigate();

  const calculateSumOfTickets = () => {
    let tickets;

    if (selectedFlights.return) {
      tickets = [...selectedFlights.flight.tickets, ...selectedFlights?.return?.tickets];
    } else {
      tickets = selectedFlights.flight.tickets;
    }

    const sum = tickets.reduce((acc, elem) => acc + +elem.price, 0);

    return new Intl.NumberFormat('de-DE').format(sum + sumSeats());
  };

  const handler_btn = async () => {
    if (action_btn === 'go-to-next-page') {
      if (isClientInfoValid) {
        const result = isClientInfoValid();

        if (!result.success) {
          return alert(result.message[currentLang]);
        }
      }

      navigate(next_page);
    } else if (action_btn === 'payment') {
      if (!paymentAgreements.isCreditCartChecked || !paymentAgreements.isPrivacyNoticeTextChecked) {
        const alertMessages = {
          am: "Խնդրում ենք հաստատել վճարման եղանակը և ընդունել տվյալների գաղտնիության պայմանները։",
          ru: "Пожалуйста, подтвердите способ оплаты и примите условия конфиденциальности.",
          en: "Please confirm the payment method and accept the privacy policy."
        };

        return alert(alertMessages[currentLang]);
      }

      try {
        // BANKI KTOR



        // ===========================================================================

        const selectedFlights = JSON.parse(sessionStorage.getItem('selectedFlights'));

        let depSeat = null;
        let retSeat = null;

        const postData = passangerList.map((elem, index) => {
          if (elem.passenger_type !== 'baby' && !elem.departure_seat_id) {
            elem.departure_seat_id = selectedFlights.flight.flight_seats[index].id;
            depSeat = selectedFlights.flight.flight_seats[index];
          }

          if (elem.passenger_type !== 'baby' && !elem.return_seat_id) {
            elem.return_seat_id = selectedFlights.return.flight_seats[index].id;
            retSeat = selectedFlights.return.flight_seats[index];
          }

          return elem;
        });


        try {

          await axios.post(`http://46.182.172.161:8085/api/flights_seats/${depSeat.id}/set_taken/`);
          await axios.post(`http://46.182.172.161:8085/api/flights_seats/${retSeat.id}/set_taken/`);

        } catch (error) {
          console.log(error);
        }

      } catch (error) {
        console.log(error);
      }

    }
  };

  const sumSeats = () => {
    if (calculatePriceSumOfSeats) {
      return calculatePriceSumOfSeats();
    }

    return 0;
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
          <span className='result'>{new Intl.NumberFormat('de-DE').format(selectedFlights.flight.tickets[0].price)} ֏</span>

        </p>

        <p className='flex-between'>
          <span className='text'>{orderSummary.seat_text_field}</span>
          <span className='result'>{sumSeats()} ֏</span>
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