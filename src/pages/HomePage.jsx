import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { Loading } from '../components/Loading';
import { Intro } from '../components/HomePage/Intro/Intro';
import { BookingSearch } from '../components/HomePage/BookingSearch/BookingSearch';
import { WhyChooseUs } from '../components/HomePage/WhyChooseUs/WhyChooseUs';
import { Faq } from '../components/HomePage/Faq/Faq';
import axios from '../axios';
import '../stylesheets/HomePage.css';

export function HomePage() {
  const { currentLang } = useContext(LanguageContext);
  const [introData, setIntroData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [whyChooseUsData, setWhyChooseUsData] = useState(null);
  const [faqData, setFaqData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingData = async () => {
      const resIntro = await axios.get(`homepage_intro/?lang=${currentLang}`);
      setIntroData(resIntro.data.results[0]);

      const resBooking = await axios.get(`homepage_booking_search/?lang=${currentLang}`);
      const resFlightDirections = await axios.get('flight_direction/grouped/');
      setBookingData({ directions: resFlightDirections.data, bookingFields: resBooking.data.results[0] })

      const resWhyChooseUs = await axios.get(`homepage_why_choose_us/?lang=${currentLang}`);
      setWhyChooseUsData(resWhyChooseUs.data.results[0]);

      const resFaq = await axios.get(`homepage_faq/?lang=${currentLang}`);
      setFaqData(resFaq.data.results[0]);
      setLoading(false);
    };

    window.scrollTo(0, 0);
    loadingData();
    sessionStorage.clear();
  }, [currentLang]);

  return (
    <div className="HomePage">
      {loading && <Loading />}
      {introData && <Intro introData={introData} />}
      {bookingData && <BookingSearch bookingData={bookingData} />}
      {whyChooseUsData && <WhyChooseUs whyChooseUsData={whyChooseUsData} />}
      {faqData && <Faq faqData={faqData} />}
    </div>
  )
}