import { useNavigate } from 'react-router-dom';
import { From } from './From';
import { To } from './To';
import { Calendar } from './Calendar';
import { Passangers } from './Passangers';
import axios from '../../../axios';
import './BookingSearch.css';

export function BookingSearch({ }) {
  const navigate = useNavigate();

  const handlerSearchBtn = async () => {
    try {
      // const res = await axios.post('search-flights/', bookingData);
      // sessionStorage.setItem('bookingSearchResult', JSON.stringify(res.data));
      // navigate('/booking')
      // console.log(res.data);
      
    } catch (error) {
      alert(error.response.data['am']);
    }
  }

  return (
    <div className='BookingSearch'>
      <div className="container">
        <div className="row flex-between">
          <From />
          {/* <To /> */}
          {/* <Calendar /> */}
          {/* <Passangers /> */}
          <button className='btn' onClick={handlerSearchBtn}>Search</button>
        </div>
      </div>
    </div>
  )
}