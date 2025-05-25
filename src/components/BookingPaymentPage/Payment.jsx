import './Payment.css';

export function Payment({ bookingPaymentPageLabel, paymentAgreements, setPaymentAgreements }) {
  return (
    <div className="Payment">
      <h2 className="title">{bookingPaymentPageLabel.title}</h2>

      <div className="box flex-between" style={{ marginBottom: '10px' }}>
        <div className="flex-center">
          <input
            id='card'
            type="checkbox"
            checked={paymentAgreements.isCreditCartChecked}
            onChange={() =>
              setPaymentAgreements(prev => ({
                ...prev,
                isCreditCartChecked: !prev.isCreditCartChecked
              }))
            }
          />

          <label htmlFor="card">{bookingPaymentPageLabel.credit_card_text}</label>
        </div>

        <img src="/images/cards.svg" alt="cards" />
      </div>

      <div className="box">
        <div className="flex-center">
          <input
            type="checkbox"
            id='privacy_notice_text'
            checked={paymentAgreements.isPrivacyNoticeTextChecked}
            onChange={() =>
              setPaymentAgreements(prev => ({
                ...prev,
                isPrivacyNoticeTextChecked: !prev.isPrivacyNoticeTextChecked
              }))
            }
          />

          <label htmlFor="privacy_notice_text">{bookingPaymentPageLabel.privacy_notice_text}</label>
        </div>
      </div>
    </div>
  )
}
