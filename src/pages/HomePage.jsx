import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../context/LanguageContext';
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

  const [bookingPostData, setBookingPostData] = useState({
    "from_here": "Erevan",
    "to_there": "Syuniq",
    "airport_name": "Զվարթնոց",
    "ariport_short_name": "ԶՎԹ",
    "arrival_airport_name": "Suniq",
    "arrival_airport_short_name": "Syun",
    "departure_date": "2025-05-09",
    "return_date": null,
    "adult_count": 1,
    "child_count": 1,
    "baby_count": 0
  });

  useEffect(() => {
    const loadingData = async () => {
      const resIntro = await axios.get(`homepage_intro/?lang=${currentLang}`);
      setIntroData(resIntro.data.results[0]);

      const resBooking = await axios.get(`homepage_booking_search/?lang=${currentLang}`);
      const resFlightDirections = await axios.get('flight_direction/');
      console.log(resBooking.data.results[0]);
      console.log(resFlightDirections.data.results);
      
      

      const resWhyChooseUs = await axios.get(`homepage_why_choose_us/?lang=${currentLang}`);
      setWhyChooseUsData(resWhyChooseUs.data.results[0]);

      const resFaq = await axios.get(`homepage_faq/?lang=${currentLang}`);
      setFaqData(resFaq.data.results[0]);
    };

    window.scrollTo(0, 0);
    loadingData();
  }, [currentLang]);

  return (
    <div className="HomePage">
      {introData && <Intro introData={introData} />}
      {bookingData && <BookingSearch />}
      {whyChooseUsData && <WhyChooseUs whyChooseUsData={whyChooseUsData} />}
      {faqData && <Faq faqData={faqData} />}
    </div>
  )
}