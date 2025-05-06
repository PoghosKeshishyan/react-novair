import { useEffect } from "react";
import { BookingNavigation } from "../components/BookingNavigation/BookingNavigation";
import { Payment } from "../components/BookingPaymentPage/Payment";
import { OrderSummary } from "../components/OrderSummary/OrderSummary";
import '../stylesheets/BookingPaymentPage.css';

export function BookingPaymentPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="BookingPaymentPage">
      <BookingNavigation active_section={2} />

      <div className="page-row container">
        <Payment />
        <OrderSummary action_btn='payment' btn_text='Pay' />
      </div>
    </div>
  )
}
