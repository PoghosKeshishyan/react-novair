import { useNavigate } from 'react-router-dom';
import './OrderSummary.css';

export function OrderSummary({ next_page, action_btn, btn_text }) {
  const navigate = useNavigate();

  const handler_btn = () => {
    if (action_btn === 'go-to-next-page') {
      navigate(next_page);
    } else if (action_btn === 'payment') {
      alert('Գնումը հաջողությամբ կատարվեց');
    }
  };

  return (
    <div className='OrderSummary'>
      <h2 className='title'>Order summary</h2>

      <div className="directions">
        <div className='box'>
          <div className="row flex-center">
            <img src="/images/plane-flight.svg" alt="plane-flight" />
            <p className='route'>Yerevan - Jakarta</p>
          </div>

          <p className='date-time'>March 5, 2025 • 13:00</p>
        </div>

        <div className='box'>
          <div className="row flex-center">
            <img src="/images/plane-arrive.svg" alt="plane-flight" />
            <p className='route'>Jakarta - Yerevan</p>
          </div>
          
          <p className='date-time'>March 8, 2025 • 13:00</p>
        </div>
      </div>

      <div className="sub-total">
        <h3 className='title'>Subtotal</h3>

        <p className='flex-between'>
          <span className='text'>Quantity (1 Pax)</span>
          <span className='result'>$1780</span>
        </p>

        <p className='flex-between'>
          <span className='text'>Seat</span>
          <span className='result'>$0</span>
        </p>
      </div>

      <div className="total flex-between">
        <p className="text">Total</p>
        <p className="result">$1782</p>
      </div>

      <button onClick={handler_btn} className='order-summary-btn'>{btn_text}</button>
    </div>
  )
}
