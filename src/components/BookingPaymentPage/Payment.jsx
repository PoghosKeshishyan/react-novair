import './Payment.css';

export function Payment() {
  return (
    <div className="Payment">
        <h2 className="title">Payment</h2>

        <div className="box flex-between">
            <form className='flex-center'>
                <input type="radio" id='card' />
                <label htmlFor="card">Credit card</label>
            </form>

            <img src="/images/cards.svg" alt="cards" />
        </div>
    </div>
  )
}
