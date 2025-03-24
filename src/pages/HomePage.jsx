import Intro from '../components/HomePage/Intro/Intro';
import BookingSearch from '../components/HomePage/BookingSearch/BookingSearch';
import '../stylesheets/HomePage.css';

export default function HomePage() {
  return (
    <div className="HomePage">
      <Intro />
      <BookingSearch />
    </div>
  )
}
