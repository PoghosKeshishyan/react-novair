import From from './From';
import To from './To';
import Calendar from './Calendar';
import Passangers from './Passangers';
import './BookingSearch.css';

export default function BookingSearch() {
  return (
    <div className='BookingSearch'>
        <div className="container">
            <div className="row flex-between">
                <From />
                <To />
                <Calendar />
                <Passangers />
                <button className='btn'>Search</button>
            </div>
        </div>
    </div>
  )
}
