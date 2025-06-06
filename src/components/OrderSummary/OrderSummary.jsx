import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import './OrderSummary.css';

export function OrderSummary({
  isFixedOrderSummary,
  next_page,
  selectedFlights,
  orderSummary,
  validatePassengerAges,
  action_btn,
  btn_text,
  isClientInfoValid,
  calculatePriceSumOfSeats,
  checkPassportValidity,
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

      if (checkPassportValidity) {
        const isPassportValid = checkPassportValidity();

        if (!isPassportValid) {
          return;
        }
      }

      if (validatePassengerAges) {
        const ageValidation = validatePassengerAges();
        if (!ageValidation) {
          return;
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
        const bookingPostData = JSON.parse(sessionStorage.getItem('bookingPostData'));

        const postData = passangerList.map((elem, index) => {
          if (elem.passenger_type !== 'baby' && !elem.departure_seat_id) {
            elem.departure_seat_id = selectedFlights.flight.flight_seats[index].id;
          }

          if (bookingPostData.return_date && elem.passenger_type !== 'baby' && !elem.return_seat_id) {
            elem.return_seat_id = selectedFlights.return.flight_seats[index].id;
          }

          return elem;
        });

        /* ============================= for flight tickets ============================= */
        try {
          postData.forEach(async elem => {

            // gnum enq ticket@
            let currentTicket = selectedFlights.flight.tickets.find(item => item.id === elem.ticket_id);
            console.log('departure currentTicket', currentTicket);
            console.log('deparuter elem', elem);


            let www = await axios.post(`tickets/${currentTicket.id}/set_sold/`);
            console.log('Ticket@ sold enq sarqum', www);


            // broni enq anum nstatex@
            if (elem.passenger_type !== 'baby') {
              let a = await axios.post(`flights_seats/${elem.departure_seat_id}/set_taken/`);
              console.log('Nstatexn enq broni anum', a);
            }

            // pasajiri tvyalner@ post em anum
            let c = await axios.post(`passangers/`, elem);
            console.log('passanget Listn enq save anum', c);

            console.log(elem);

            console.log('----------------------------------------');

          })

        } catch (error) {
          console.log(error);
        }

        console.log('======================================================== return');


        /* ============================= for return tickets ============================= */
        if (bookingPostData.return_date) {
          try {
            postData.forEach(async elem => {
              elem.ticket_id = elem.return_ticket_id;

              // gnum enq ticket@
              let currentTicket = selectedFlights.return.tickets.find(item => item.id === elem.return_ticket_id);
              let www = await axios.post(`tickets/${currentTicket.id}/set_sold/`);
              console.log('Ticket@ sold enq sarqum', www);

              // broni enq anum nstatex@
              if (elem.passenger_type !== 'baby') {
                let a = await axios.post(`flights_seats/${elem.return_seat_id}/set_taken/`);
                console.log('Nstatexn enq broni anum', a);
              }


              // pasajiri tvyalner@ post em anum
              let c = await axios.post(`passangers/`, elem);
              console.log('passanget Listn enq save anum', c);

              console.log('return ticket', currentTicket);
              console.log('return elem', elem);

              console.log('----------------------------------------');

            })

          } catch (error) {
            console.log(error);
          }
        }

        // alert('ԳՆՈՒՄԸ ԿԱՏԱՐՎԵՑ');

        const responseObj = {
          "am": "Գնումը հաջողությամբ կատարվեց։/Ստուգեք ձեր էլեկտրոնային փոստը։",
          "ru": "Покупка успешно завершена./Проверьте вашу электронную почту.",
          "en": "The purchase was successful./Please check your email."
        };

        localStorage.setItem('price_res', JSON.stringify({ ok: true, responseObj }));
        navigate('/');

      } catch (error) {

        const responseObj = {
          "am": "Տեղի ունեցավ սխալ։/Խնդրում ենք փորձել կրկին։",
          "ru": "Произошла ошибка./Пожалуйста, попробуйте снова.",
          "en": "An error occurred./Please try again."
        };

        localStorage.setItem('price_res', JSON.stringify({ ok: false, responseObj }));
        navigate('/');

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
    <div className={`OrderSummary ${isFixedOrderSummary ? 'fixed' : ''}`}>
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

      <button onClick={handler_btn} className='order-summary-btn'>
        {btn_text !== 'Pay' ? orderSummary.btn_text.split('/')[0] : orderSummary.btn_text.split('/')[1]}
      </button>
    </div>
  )
}