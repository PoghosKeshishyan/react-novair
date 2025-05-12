import { useEffect, useState } from 'react';
import { Intro } from '../components/HomePage/Intro/Intro';
import { BookingSearch } from '../components/HomePage/BookingSearch/BookingSearch';
import { WhyChooseUs } from '../components/HomePage/WhyChooseUs/WhyChooseUs';
import { Faq } from '../components/HomePage/Faq/Faq';
import axios from '../axios';
import '../stylesheets/HomePage.css';

export function HomePage() {
  const [bookingData, setBookingData] = useState({
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
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="HomePage">
      <Intro />
      <BookingSearch bookingData={bookingData} setBookingData={setBookingData} />
      <WhyChooseUs />
      <Faq />
    </div>
  )
}