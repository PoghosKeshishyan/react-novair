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

  const [validationErrors, setValidationErrors] = useState({});

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
        passport_validity_period: '',
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
  const errors = {};
  let isValid = true;

  for (const [index, passenger] of passangerList.entries()) {
    const passengerErrors = {};
    const requiredFields = passenger.passenger_type === 'baby' || passenger.passenger_type === 'child'
      ? ['title', 'full_name', 'date_of_birth', 'citizenship', 'passport_serial', 'passport_validity_period']
      : ['title', 'full_name', 'date_of_birth', 'citizenship', 'passport_serial', 'passport_validity_period', 'phone', 'email'];

    for (const field of requiredFields) {
      if (!passenger[field] || passenger[field].toString().trim() === '') {
        passengerErrors[field] = true;
        isValid = false;
      }
    }

    if (passenger.email && !passenger.email.includes('@')) {
      passengerErrors.email = 'invalid';
      isValid = false;
    }

    if (Object.keys(passengerErrors).length > 0) {
      errors[index] = passengerErrors;
    }
  }

  setValidationErrors(errors);

  return {
    success: isValid,
    message: {
      en: isValid ? 'All fields are filled.' : 'Please fill in all required fields correctly.',
      ru: isValid ? 'Все поля заполнены.' : 'Пожалуйста, правильно заполните все обязательные поля.',
      am: isValid ? 'Բոլոր դաշտերը լրացված են։' : 'Խնդրում ենք ճիշտ լրացնել բոլոր պարտադիր դաշտերը։'
    },
    errors
  };
};

  const checkPassportValidity = () => {
    const expiredPassengers = [];

    const flightDate = new Date(bookingPostData.departure_date);
    flightDate.setHours(0, 0, 0, 0);

    passangerList.forEach((passenger, index) => {
      if (passenger.passport_validity_period) {
        try {
          let expiryDate;

          if (passenger.passport_validity_period.includes('.')) {
            const [day, month, year] = passenger.passport_validity_period.split('.');
            expiryDate = new Date(`${year}-${month}-${day}`);
          } else {
            expiryDate = new Date(passenger.passport_validity_period);
          }

          expiryDate.setHours(0, 0, 0, 0);

          if (expiryDate < flightDate) {
            expiredPassengers.push({
              index,
              fullName: passenger.full_name,
              expiryDate: passenger.passport_validity_period
            });
          }
        } catch (e) {
          console.error('Invalid date format', e);
        }
      }
    });

    if (expiredPassengers.length > 0) {
      const message = expiredPassengers.map(p =>
        `${p.fullName} - ${p.expiryDate}`
      ).join('\n');

      const alertMessage = {
        en: `Passport expired for:\n${message}\n\nPlease update passport information.`,
        ru: `Срок действия паспорта истек для:\n${message}\n\nПожалуйста, обновите данные паспорта.`,
        am: `Անձնագրի ժամկետը լրացել է:\n${message}\n\nԽնդրում ենք թարմացնել անձնագրի տվյալները։`
      };

      alert(alertMessage[currentLang]);
      return false;
    }

    return true;
  };

  const validatePassengerAges = () => {
    const today = new Date();
    const flightDate = new Date(bookingPostData.departure_date);
    flightDate.setHours(0, 0, 0, 0);

    const errors = [];

    passangerList.forEach((passenger, index) => {
      if (!passenger.date_of_birth) return;

      try {
        let birthDate;

        if (passenger.date_of_birth.includes('.')) {
          const [day, month, year] = passenger.date_of_birth.split('.');
          birthDate = new Date(`${year}-${month}-${day}`);
        } else {
          birthDate = new Date(passenger.date_of_birth);
        }

        birthDate.setHours(0, 0, 0, 0);

        // Calculate age in years
        let age = flightDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = flightDate.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && flightDate.getDate() < birthDate.getDate())) {
          age--;
        }

        // Calculate age in days for more precise validation
        const ageInDays = Math.floor((flightDate - birthDate) / (1000 * 60 * 60 * 24));

        if (passenger.passenger_type === 'baby' && ageInDays >= 730) { // 730 days = 2 years
          errors.push({
            index,
            fullName: passenger.full_name,
            ageType: 'baby',
            maxAge: 2,
            actualAge: age
          });
        }

        if (passenger.passenger_type === 'child' && (ageInDays < 730 || age >= 12)) {
          errors.push({
            index,
            fullName: passenger.full_name,
            ageType: 'child',
            minAge: 2,
            maxAge: 12,
            actualAge: age
          });
        }
      } catch (e) {
        console.error('Invalid date format', e);
      }
    });

    if (errors.length > 0) {
      const message = errors.map(err => {
        if (err.ageType === 'baby') {
          return {
            en: `${err.fullName} - Age ${err.actualAge} (Baby must be under 2 years old)`,
            ru: `${err.fullName} - Возраст ${err.actualAge} (Младенец должен быть младше 2 лет)`,
            am: `${err.fullName} - Տարիք ${err.actualAge} (Մանուկը պետք է լինի 2 տարեկանից փոքր)`
          };
        } else {
          return {
            en: `${err.fullName} - Age ${err.actualAge} (Child must be between 2-12 years old)`,
            ru: `${err.fullName} - Возраст ${err.actualAge} (Ребенок должен быть в возрасте 2-12 лет)`,
            am: `${err.fullName} - Տարիք ${err.actualAge} (Երեխան պետք է լինի 2-12 տարեկան)`
          };
        }
      }).map(msg => msg[currentLang]).join('\n');

      const alertMessage = {
        en: `Age validation failed:\n${message}\n\nPlease correct passenger ages.`,
        ru: `Ошибка проверки возраста:\n${message}\n\nПожалуйста, исправьте возраст пассажиров.`,
        am: `Տարիքի ստուգումը ձախողվել է:\n${message}\n\nԽնդրում ենք ուղղել ուղևորների տարիքը:`
      };

      alert(alertMessage[currentLang]);
      return false;
    }

    return true;
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
                validationErrors={validationErrors}
                holdSeats={holdSeats}
                currentLang={currentLang}
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

        <div className='bookingInfoOrderSummary'>
          {orderSummary && <OrderSummary
            orderSummary={orderSummary}
            currentLang={currentLang}
            next_page={'/booking/payment'}
            action_btn={'go-to-next-page'}
            btn_text={'Continue'}
            checkPassportValidity={checkPassportValidity}
            selectedFlights={selectedFlights}
            calculatePriceSumOfSeats={calculatePriceSumOfSeats}
            isClientInfoValid={isClientInfoValid}
            validatePassengerAges={validatePassengerAges}
          />}
        </div>
      </div>
    </div>
  );
}
