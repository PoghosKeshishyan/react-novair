import '../stylesheets/BookingPaymentPage.css';
import { useState } from 'react';

export function BookingPaymentPage() {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [cvv, setCvv] = useState('');

    const formatCardNumber = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(.{4})/g, '$1 ')
            .trim()
            .slice(0, 19);
    };

    const formatExpiry = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d{0,2})/, (_, m1, m2) => (m2 ? `${m1} / ${m2}` : m1))
            .slice(0, 7);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Payment Submitted');
    };

    return (
        <div className="BookingPaymentPage">
            <h2>Payment</h2>

            <div className='payment-container'>

                <div className="card-preview">
                    <div className="card-chip"></div>
                    <div className="card-number">{cardNumber || '**** **** **** ****'}</div>
                    <div className="card-info">
                        <div className="card-holder">
                            <label>Cardholder</label>
                            <div>{cardHolder || 'JOHN DOE'}</div>
                        </div>
                        <div>
                            <label>CVV</label>
                            <div>{cvv || '***'}</div>
                        </div>
                        <div className="card-expiry">
                            <label>Expires</label>
                            <div>{expiry || 'MM / YY'}</div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="payment-form">
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="Card Number"
                        required
                    />
                    <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        placeholder="MM / YY"
                        required
                    />
                    <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="CVV"
                        maxLength={3}
                        required
                    />
                    <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        placeholder="Cardholder Name"
                        required
                    />
                    <button type="submit">Pay</button>
                </form>

            </div>
        </div>
    );
}
