import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { BookingNavigation } from "../components/BookingNavigation/BookingNavigation";
import { Payment } from "../components/BookingPaymentPage/Payment";
import { OrderSummary } from "../components/OrderSummary/OrderSummary";
import { Loading } from "../components/Loading";
import axios from "../axios";
import '../stylesheets/BookingPaymentTermsPage.css';

export function BookingPaymentTermsPage() {
  const { currentLang } = useContext(LanguageContext);
  const [loading, setLoading] = useState(true);
  const [bookingNavigation, setBookingNavigation] = useState(null);
  const [orderSummary, setOrderSummary] = useState(null);
  const [bookingPaymentPageLabel, setBookingPaymentPageLabel] = useState(null);

  const [paymentAgreements, setPaymentAgreements] = useState({
    isCreditCartChecked: false,
    isPrivacyNoticeTextChecked: false
  });

  const [passangerList, setPassangerList] = useState(() => {
    return JSON.parse(sessionStorage.getItem('passangerList')) || [];
  });

  const selectedFlights = JSON.parse(sessionStorage.getItem('selectedFlights'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadingData = async () => {
      const resBookingNavigation = await axios.get(`booking_navigation?lang=${currentLang}`);
      setBookingNavigation(resBookingNavigation.data.results);
      
      const resOrderSummary = await axios.get(`order_summary?lang=${currentLang}`);
      setOrderSummary(resOrderSummary.data.results[0]);

      const resBookingPaymentPageLabel = await axios.get(`booking_payment_page_label?lang=${currentLang}`);
      setBookingPaymentPageLabel(resBookingPaymentPageLabel.data.results[0]);

      setLoading(false);
    };

    loadingData();
    window.scrollTo(0, 0);
  }, [currentLang]);

  const calculatePriceSumOfSeats = () => {
    const sum = passangerList.reduce((total, elem) => {
      if (elem.departure_seat_id) total += 2000;
      if (elem.return_seat_id) total += 2000;
      return total;
    }, 0);

    return sum;
  };

  return (
    <div className="BookingPaymentTermsPage">
      {loading && <Loading />}
      {bookingNavigation && <BookingNavigation bookingNavigation={bookingNavigation} active_section={2} />}

      <div className="page-row container">
        {bookingPaymentPageLabel && <Payment
          bookingPaymentPageLabel={bookingPaymentPageLabel}
          paymentAgreements={paymentAgreements}
          setPaymentAgreements={setPaymentAgreements}
        />}

        {orderSummary && <OrderSummary
          action_btn='pay'
          btn_text='pay'
          orderSummary={orderSummary}
          selectedFlights={selectedFlights}
          calculatePriceSumOfSeats={calculatePriceSumOfSeats}
          paymentAgreements={paymentAgreements}
          currentLang={currentLang}
          passangerList={passangerList}
        />}
      </div>
    </div>
  )
}
