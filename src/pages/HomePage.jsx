import { Intro } from '../components/HomePage/Intro/Intro';
import { BookingSearch } from '../components/HomePage/BookingSearch/BookingSearch';
import { WhyChooseUs } from '../components/HomePage/WhyChooseUs/WhyChooseUs';
import { Faq } from '../components/HomePage/Faq/Faq';
import '../stylesheets/HomePage.css';

export function HomePage() {
  return (
    <div className="HomePage">
      <Intro />
      <BookingSearch />
      <WhyChooseUs />
      <Faq />
    </div>
  )
}