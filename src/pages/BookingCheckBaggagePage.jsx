import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { BookingNavigation } from '../components/BookingNavigation/BookingNavigation';
import { CheckBaggage } from '../components/BookingCheckBaggagePage/CheckBaggage';
import { OrderSummary } from '../components/OrderSummary/OrderSummary';
import axios from 'axios';
import '../stylesheets/BookingCheckBaggagePage.css';

export function BookingCheckBaggagePage() {
    const { currentLang } = useContext(LanguageContext);
    const [bookingNavigation, setBookingNavigation] = useState(null);
    const [baggagePageLabel, setBaggagePageLabel] = useState(null);
    const [orderSummary, setOrderSummary] = useState(null);
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
                citizenship: '',
                citizenship_code: '',
                passport_serial: '',
                passenger_type: ticket.passenger_type,
                departure_seat_id: null,
                return_seat_id: null,
                email: null,
                phone: null,
                departure_baggage_weight: null,
                return_baggage_weight: null,
            }

            return baseTicket;
        });
    });

    useEffect(() => {
        sessionStorage.setItem('passangerList', JSON.stringify(passangerList));
    }, [passangerList])

    useEffect(() => {
        const loadingData = async () => {
            const resBookingNavigation = await axios.get(`http://localhost:8000/booking_navigation?lang=${currentLang}`);
            setBookingNavigation(resBookingNavigation.data);

            const resOrderSummary = await axios.get(`http://localhost:8000/order_summary?lang=${currentLang}`)
            setOrderSummary(resOrderSummary.data[0]);

            const resBaggageLabel = await axios.get(`http://localhost:8000/booking_check_baggage_page_label?lang=${currentLang}`);
            setBaggagePageLabel(resBaggageLabel.data[0]);
        };

        loadingData();
        window.scrollTo(0, 0);
    }, [currentLang]);


    const saveInSession10kgBaggage = (ticket_id, baggage_weights) => {
        const newPassangerList = passangerList.map(elem => {
            if (elem.ticket_id === ticket_id) {
                elem.departure_baggage_weight = baggage_weights.first ? "10 kg" : null;

                if (bookingPostData.return_date) {
                    elem.return_baggage_weight = baggage_weights.second ? "10 kg" : null;
                }
            }

            return elem;
        });

        setPassangerList(newPassangerList);
    };

    return (
        <div className="BookingCheckBaggagePage">
            {bookingNavigation && <BookingNavigation bookingNavigation={bookingNavigation} />}

            <div className="page-row container">
                <div className='parent'>
                    {baggagePageLabel && passangerList.map((elem, index) => (
                        elem.passenger_type !== 'baby' ? (
                            <CheckBaggage
                                key={Math.random() * 100000}
                                elem={elem}
                                index={index}
                                baggagePageLabel={baggagePageLabel}
                                bookingPostData={bookingPostData}
                                saveInSession10kgBaggage={saveInSession10kgBaggage}
                            />
                        ) : null
                    ))}
                </div>

                {orderSummary && <OrderSummary
                    orderSummary={orderSummary}
                    selectedFlights={selectedFlights}
                    next_page={'/booking/client-info'}
                    action_btn={'go-to-next-page'}
                    btn_text={'Continue'}
                />}
            </div>
        </div>
    );
}
