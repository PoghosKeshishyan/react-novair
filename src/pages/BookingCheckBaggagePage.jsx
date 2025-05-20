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
    const [isSameForBothWays, setIsSameForBothWays] = useState(true);
    const [selectedDirection, setSelectedDirection] = useState('both'); // 'first', 'second', or 'both'
    const bookingPostData = JSON.parse(sessionStorage.getItem('bookingPostData'));
    const selectedFlights = JSON.parse(sessionStorage.getItem('selectedFlights'));

    const [baggage10kg, setBaggage10kg] = useState({
        first: false,
        second: bookingPostData.return_date === null ? null : false
    });

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

    const toggleSameForBothWays = () => {
        setIsSameForBothWays(!isSameForBothWays);

        if (!isSameForBothWays) {
            setBaggage10kg({
                first: baggage10kg.first,
                second: baggage10kg.first
            });

            setSelectedDirection('both');
        } else {
            setSelectedDirection('first');
        }
    };

    const add10kgFunc = () => {
        if (isSameForBothWays) {
            const newValue = !baggage10kg.first;

            setBaggage10kg({
                first: newValue,
                second: baggage10kg.second === null ? null : newValue
            });
        } else {
            if (selectedDirection === 'second' && baggage10kg.second === null) return;

            setBaggage10kg(prev => ({
                ...prev,
                [selectedDirection]: !prev[selectedDirection]
            }));
        }
    };

    const handleDirectionSelect = (direction) => {
        setSelectedDirection(direction);
    };

    return (
        <div className="BookingCheckBaggagePage">
            {bookingNavigation && <BookingNavigation bookingNavigation={bookingNavigation} />}

            <div className="page-row container">
                {baggagePageLabel && <CheckBaggage
                    baggagePageLabel={baggagePageLabel}
                    bookingPostData={bookingPostData}
                    isSameForBothWays={isSameForBothWays}
                    toggleSameForBothWays={toggleSameForBothWays}
                    baggage10kg={baggage10kg}
                    add10kgFunc={add10kgFunc}
                    selectedDirection={selectedDirection}
                    handleDirectionSelect={handleDirectionSelect}
                />}

                {orderSummary && <OrderSummary
                    orderSummary={orderSummary}
                    selectedFlights={selectedFlights}
                    next_page={'/booking/client-info'}
                    action_btn={'go-to-next-page'}
                    btn_text={'Continue'}
                    baggage10kg={baggage10kg}
                />}
            </div>
        </div>
    );
}
