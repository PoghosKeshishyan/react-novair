import './CheckBaggage.css';

export function CheckBaggage({ 
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
        <h2 className="title">Checked-in baggage</h2>

        <div className="list-baggage flex-between">
            <div className="baggage flex-between active">
                <img src="/images/baggage-5kg.svg" alt="baggage" />
                <p>5 kg</p>
            </div>

            <div className={`baggage flex-between ${isChecked ? 'active' : ''}`}>
                {
                    isChecked ? 
                    <img src="/images/baggage-10kg-active.svg" alt="baggage" />
                    :
                    <img src="/images/baggage-10kg-disabled.svg" alt="baggage" />
                }

                <p>10 kg</p>

                <button className='baggage-add-btn' onClick={add10kgFunc}>
                    {isChecked ? 'Remove' : 'Add'}
                </button>
            </div>
        </div>

        <div className="choose-direction">
            <div className="checkbox-container">
                <input type="checkbox" id='check' checked={isSameForBothWays} onChange={toggleSameForBothWays} />
                <label htmlFor='check'>I select the same for both ways</label>
            </div>

            {!isSameForBothWays && <div className="directions flex-between">
                <div
                    className={`box flex-center ${selectedDirection === 'first' ? 'active' : ''}`}
                    onClick={() => handleDirectionSelect('first')}
                >
                    <img src="/images/plane-flight.svg" alt="plane-flight" />
                    <p>Yerevan - Jakarta</p>
                </div>

                <div
                    className={`box flex-center ${selectedDirection === 'second' ? 'active' : ''}`}
                    onClick={() => handleDirectionSelect('second')}
                >
                    <img src="/images/plane-arrive.svg" alt="plane-arrive" />
                    <p>Jakarta - Yerevan</p>
                </div>
            </div>}
        </div>
    </div>
  );
}