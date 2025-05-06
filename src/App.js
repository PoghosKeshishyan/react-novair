import { Route, Routes } from "react-router";
import { Header } from "./components/Header/Header";
import { HomePage } from "./pages/HomePage";
import { BookingResultsPage } from "./pages/BookingResultsPage";
import { BookingCheckBaggagePage } from "./pages/BookingCheckBaggagePage";
import { BookingClientInfoPage } from './pages/BookingClientInfoPage';
import { BookingPaymentPage } from "./pages/BookingPaymentPage";
import { Footer } from "./components/Footer/Footer";

export default function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingResultsPage />} />
        <Route path="/booking/check-baggage" element={<BookingCheckBaggagePage />} />
        <Route path="/booking/client-info" element={<BookingClientInfoPage />} />
        <Route path="/booking/payment" element={<BookingPaymentPage />} />
      </Routes>

      <Footer />
    </div>
  )
}
