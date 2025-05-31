import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "./context/LanguageContext";
import { Route, Routes } from "react-router";
import { Header } from "./components/Header/Header";
import { HomePage } from "./pages/HomePage";
import { BookingResultsPage } from "./pages/BookingResultsPage";
import { BookingClientInfoPage } from './pages/BookingClientInfoPage';
import { BookingPaymentPage } from "./pages/BookingPaymentPage";
import { BaggagePage } from "./pages/BaggagePage";
import { SeatChoicePage } from "./pages/SeatChoicePage";
import { AirTransContact } from "./pages/AirTransContact";
import { CertificatesPage } from "./pages/CertificatesPage";
import { ContactPage } from "./pages/ContactPage";
import { Footer } from "./components/Footer/Footer";
import axios from "./axios";

export function App() {
  const { currentLang } = useContext(LanguageContext);
  const [headerData, setHeaderData] = useState(null);
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const loadingData = async () => {
      try {
        const [resLogo, resNavbar, resLanguages, resFooter] = await Promise.all([
          axios.get('logo'),
          axios.get(`navbars?lang=${currentLang}`),
          axios.get('languages'),
          axios.get(`footers?lang=${currentLang}`)
        ]);

        setHeaderData({
          logo: resLogo.data.results[0],
          navbar: resNavbar.data.results,
          languages: resLanguages.data.results,
        });

        setFooterData({
          logo: resLogo.data.results[0],
          urls: resFooter.data.results[0],
        });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    loadingData();
  }, [currentLang]);

  return (
    <div className={`App ${currentLang === 'am' ? 'am-font' : ''}`}>
      {headerData && <Header headerData={headerData} />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingResultsPage />} />
        <Route path="/booking/client-info" element={<BookingClientInfoPage />} />
        <Route path="/booking/payment" element={<BookingPaymentPage />} />
        <Route path="/services/baggage" element={<BaggagePage />} />
        <Route path="/services/seat-choice" element={<SeatChoicePage />} />
        <Route path="/information/air-trans-contact" element={<AirTransContact />} />
        <Route path="/about/certificates" element={<CertificatesPage />} />
        <Route path="/about/contact" element={<ContactPage />} />
      </Routes>

      {footerData && <Footer footerData={footerData} />}
    </div>
  );
}