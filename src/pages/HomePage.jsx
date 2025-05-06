import { useEffect, useState } from 'react';
import { Intro } from '../components/HomePage/Intro/Intro';
import { BookingSearch } from '../components/HomePage/BookingSearch/BookingSearch';
import { WhyChooseUs } from '../components/HomePage/WhyChooseUs/WhyChooseUs';
import { Faq } from '../components/HomePage/Faq/Faq';
import '../stylesheets/HomePage.css';

export function HomePage() {
  const [bookingData, setBookingData] = useState({
    "from_here": "Erevan",
    "to_there": "Syuniq",
    "departure_date": "2025-05-06",
    "return_date": "2025-05-08",
    "adult_count": 2,
    "child_count": 0,
    "baby_count": 0,
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