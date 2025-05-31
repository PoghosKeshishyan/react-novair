import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { BookingNavigation } from '../components/BookingNavigation/BookingNavigation';
import { ClientInfoForm } from '../components/BookingClientInfoPage/ClientInfoForm';
import { OrderSummary } from '../components/OrderSummary/OrderSummary';
import { Loading } from '../components/Loading';
import axios from '../axios';
import '../stylesheets/BookingClientInfoPage.css';

export function BookingClientInfoPage() {
  const { currentLang } = useContext(LanguageContext);
  const [loading, setLoading] = useState(true);
  const [bookingNavigation, setBookingNavigation] = useState(null);
  const [orderSummary, setOrderSummary] = useState(null);
  const [clientInfoPageLabel, setClientInfoPageLabel] = useState(null);
  const [flightSeats, setFlightSeats] = useState(null);
  const [holdSeats, setHoldSeats] = useState({
    departureSeats: [],
    returnSeats: [],
  });

  const bookingPostData = JSON.parse(sessionStorage.getItem('bookingPostData'));
  const selectedFlights = JSON.parse(sessionStorage.getItem('selectedFlights'));
  const ticketsInSession = selectedFlights.flight.tickets;
  let returnTicketsInSession;

  if (bookingPostData.return_date) {
    returnTicketsInSession = selectedFlights.return.tickets;
  }

  const [passangerList, setPassangerList] = useState(() => {
    return JSON.parse(sessionStorage.getItem('passangerList')) || ticketsInSession.map((ticket, index) => {
      const baseTicket = {
        ticket_id: ticket.id,
        return_ticket_id: bookingPostData.return_date && returnTicketsInSession[index].id,
        title: 'Mrs',
        full_name: '',
        date_of_birth: '',
        citizenship: 'Armenia',
        citizenship_code: 'AM',
        passport_serial: '',
        passenger_type: ticket.passenger_type,
        departure_seat_id: null,
        return_seat_id: null,
        email: '',
        phone: '',
      };

      return baseTicket;
    });
  });


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadingData = async () => {
      const resBookingNavigation = await axios.get(`booking_navigation?lang=${currentLang}`);
      setBookingNavigation(resBookingNavigation.data.results);

      const resOrderSummary = await axios.get(`order_summary?lang=${currentLang}`);
      setOrderSummary(resOrderSummary.data.results[0]);

      const resBookingClientInfoPageLabel = await axios.get(`booking_client_info_page_label?lang=${currentLang}`);
      setClientInfoPageLabel(resBookingClientInfoPageLabel.data.results[0]);

      /* =============================== flight seats =============================== */
      if (bookingPostData.return_date) {
        const resDepartureSeats = await axios.get(`flights_seats/?flight_id=${selectedFlights.flight.id}`);
        const resReturnSeats = await axios.get(`flights_seats/?flight_id=${selectedFlights.return.id}`);

        setFlightSeats(prev => {
          return { ...prev, departureSeats: resDepartureSeats.data, returnSeats: resReturnSeats.data };
        })
      } else {
        const resDepartureSeats = await axios.get(`flights_seats/?flight_id=${selectedFlights.flight.id}`);

        setFlightSeats(prev => {
          return { ...prev, departureSeats: resDepartureSeats.data };
        })
      };

      setLoading(false);
    };

    loadingData();
    window.scrollTo(0, 0);
  }, [currentLang]);

  useEffect(() => {
    sessionStorage.setItem('passangerList', JSON.stringify(passangerList));
  }, [passangerList]);

  const onChangePassangerListInput = (index, name, value) => {
    setPassangerList(prev =>
      prev.map((elem, i) =>
        i === index ? { ...elem, [name]: value } : elem
      )
    );
  };

  const submitFlightSeatTakenDeparture = async (currentSeat, ticket_id) => {
    try {
      await axios.post(`flights_seats/${currentSeat.departureSeats.id}/hold/`)

      const newPassangerList = passangerList.map(elem => {
        if (elem.ticket_id === ticket_id) {
          elem.departure_seat_id = currentSeat.departureSeats.id;

          setHoldSeats(prev => ({
            ...prev,
            departureSeats: [...prev.departureSeats, currentSeat.departureSeats.seat_number]
          }));
        }

        return elem;
      });

      setPassangerList(newPassangerList)
    } catch (error) {
      alert(error.response.data[currentLang]);
    }
  };

  const submitFlightSeatTakenReturn = async (currentSeat, ticket_id) => {
    try {
      await axios.post(`flights_seats/${currentSeat.returnSeats.id}/hold/`)

      const newPassangerList = passangerList.map(elem => {
        if (elem.return_ticket_id === ticket_id) {
          elem.return_seat_id = currentSeat.returnSeats.id;

          setHoldSeats(prev => ({
            ...prev,
            returnSeats: [...prev.returnSeats, currentSeat.returnSeats.seat_number]
          }));
        }

        return elem;
      });

      setPassangerList(newPassangerList)
    } catch (error) {
      alert(error.response.data[currentLang]);
    }
  };

  const calculatePriceSumOfSeats = () => {
    const sum = passangerList.reduce((total, elem) => {
      if (elem.departure_seat_id) total += 2000;
      if (elem.return_seat_id) total += 2000;
      return total;
    }, 0);

    return sum;
  };

  const isClientInfoValid = () => {
    for (const passenger of passangerList) {
      if (passenger.passenger_type === 'baby' || passenger.passenger_type === 'child') {
        const requiredFields = [
          'title',
          'full_name',
          'date_of_birth',
          'citizenship',
          'passport_serial',
        ];

        for (const field of requiredFields) {
          if (!passenger[field] || passenger[field].toString().trim() === '') {
            return {
              success: false,
              message: {
                en: 'Please fill in all required fields.',
                ru: 'Пожалуйста, заполните все обязательные поля.',
                am: 'Խնդրում ենք լրացնել բոլոր դաշտերը։'
              }
            };
          }
        }
      } else {
        const requiredFields = [
          'title',
          'full_name',
          'date_of_birth',
          'citizenship',
          'passport_serial',
          'phone',
          'email',
        ];

        for (const field of requiredFields) {
          if (!passenger[field] || passenger[field].toString().trim() === '') {
            return {
              success: false,
              message: {
                en: 'Please fill in all required fields.',
                ru: 'Пожалуйста, заполните все обязательные поля.',
                am: 'Խնդրում ենք լրացնել բոլոր դաշտերը։'
              }
            };
          }
        }
      }
    }

    return {
      success: true,
      message: {
        en: 'All fields are filled.',
        ru: 'Все поля заполнены.',
        am: 'Բոլոր դաշտերը լրացված են։'
      }
    };
  };

  return (
    <div className="BookingClientInfoPage">
      {loading && <Loading />}
      {bookingNavigation && <BookingNavigation active_section={1} bookingNavigation={bookingNavigation} />}

      <div className="page-row container">
        <div>
          {
            clientInfoPageLabel && passangerList.map((elem, index) => (
              <ClientInfoForm
                key={index}
                elem={elem}
                index={index}
                holdSeats={holdSeats}
                bookingPostData={bookingPostData}
                onChangePassangerListInput={onChangePassangerListInput}
                clientInfoPageLabel={clientInfoPageLabel}
                flightSeats={flightSeats}
                submitFlightSeatTakenDeparture={submitFlightSeatTakenDeparture}
                submitFlightSeatTakenReturn={submitFlightSeatTakenReturn}
              />
            ))
          }
        </div>

        {orderSummary && <OrderSummary
          orderSummary={orderSummary}
          currentLang={currentLang}
          next_page={'/booking/payment'}
          action_btn={'go-to-next-page'}
          btn_text={'Continue'}
          selectedFlights={selectedFlights}
          calculatePriceSumOfSeats={calculatePriceSumOfSeats}
          isClientInfoValid={isClientInfoValid}
        />}
      </div>
    </div>
  );
}
