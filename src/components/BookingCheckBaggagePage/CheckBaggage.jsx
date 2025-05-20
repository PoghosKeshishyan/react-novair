import './CheckBaggage.css';

export function CheckBaggage({ 
    baggagePageLabel,
    bookingPostData,
    isSameForBothWays, 
    toggleSameForBothWays, 
    baggage10kg, 
    add10kgFunc, 
    selectedDirection, 
    handleDirectionSelect 
}) {

  const isChecked = isSameForBothWays ? baggage10kg.first : baggage10kg[selectedDirection];

  return (
    <div className='CheckBaggage'>
        <h2 className="title">{baggagePageLabel.title}</h2>

        <div className="list-baggage flex-between">
            <div className="baggage flex-between active">
                <img src="/images/baggage-5kg.svg" alt="baggage" />
                <p>{baggagePageLabel.baggage_weights.split('/')[0]}</p>
            </div>

            <div className={`baggage flex-between ${isChecked ? 'active' : ''}`}>
                {
                    isChecked ? 
                    <img src="/images/baggage-10kg-active.svg" alt="baggage" />
                    :
                    <img src="/images/baggage-10kg-disabled.svg" alt="baggage" />
                }

                <p>{baggagePageLabel.baggage_weights.split('/')[1]}</p>

                <button className='baggage-add-btn' onClick={add10kgFunc}>
                    {isChecked ? baggagePageLabel.remove_btn_text : baggagePageLabel.add_btn_text}
                </button>
            </div>
        </div>

        {bookingPostData.return_date && <div className="choose-direction">
            <div className="checkbox-container">
                <input type="checkbox" id='check' checked={isSameForBothWays} onChange={toggleSameForBothWays} />
                <label htmlFor='check'>{baggagePageLabel.direction_warning_text}</label>
            </div>

            {!isSameForBothWays && <div className="directions flex-between">
                <div
                    className={`box flex-center ${selectedDirection === 'first' ? 'active' : ''}`}
                    onClick={() => handleDirectionSelect('first')}
                >
                    <img src="/images/plane-flight.svg" alt="plane-flight" />
                    <p>{bookingPostData.from_here} - {bookingPostData.to_there}</p>
                </div>

                <div
                    className={`box flex-center ${selectedDirection === 'second' ? 'active' : ''}`}
                    onClick={() => handleDirectionSelect('second')}
                >
                    <img src="/images/plane-arrive.svg" alt="plane-arrive" />
                    <p>{bookingPostData.to_there} - {bookingPostData.from_here}</p>
                </div>
            </div>}
        </div>}
    </div>
  );
}