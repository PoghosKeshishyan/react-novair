import { useState, useEffect } from 'react';
import './CheckBaggage.css';

export function CheckBaggage({
    elem,
    index,
    baggagePageLabel,
    bookingPostData,
    saveInSession10kgBaggage,
}) {
    const [isSameForBothWays, setIsSameForBothWays] = useState(
        elem.departure_baggage_weight === elem.return_baggage_weight
    );

    const [selectedDirection, setSelectedDirection] = useState(sessionStorage.getItem('selectedDirection') || 'first');

    const getSelectedState = () => {
        if (isSameForBothWays) {
            return elem.departure_baggage_weight === "10 kg";
        }
        return selectedDirection === 'first'
            ? elem.departure_baggage_weight === "10 kg"
            : elem.return_baggage_weight === "10 kg";
    };

    const [is10kgSelected, setIs10kgSelected] = useState(getSelectedState);

    useEffect(() => {
        setIs10kgSelected(getSelectedState());
    }, [elem, isSameForBothWays, selectedDirection]);

    const toggle10kgBaggage = () => {
        const newChecked = !is10kgSelected;
        setIs10kgSelected(newChecked);

        const newData = {
            first: isSameForBothWays || selectedDirection === 'first' ? newChecked : elem.departure_baggage_weight === "10 kg",
            second: isSameForBothWays || selectedDirection === 'second' ? newChecked : elem.return_baggage_weight === "10 kg",
        };

        saveInSession10kgBaggage(elem.ticket_id, newData);
    };

    const handleDirectionChange = (direction) => {
        setSelectedDirection(direction);
        sessionStorage.setItem('selectedDirection', direction); 
        setTimeout(() => {sessionStorage.removeItem('selectedDirection')}, 2000);
    };

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setIsSameForBothWays(checked);

        if (checked) {
            const is10kg = selectedDirection === 'first'
                ? elem.departure_baggage_weight === "10 kg"
                : elem.return_baggage_weight === "10 kg";

            setIs10kgSelected(is10kg);

            saveInSession10kgBaggage(elem.ticket_id, {
                first: is10kg,
                second: is10kg,
            });
        }
    };

    return (
        <div className='CheckBaggage'>
            <h2 className='passanger-type'>
                {index + 1}. 
                {elem.passenger_type === 'adult'
                    ? baggagePageLabel.passanger_types.split('/')[0]
                    : baggagePageLabel.passanger_types.split('/')[1]}
            </h2>

            <h3 className="title">{baggagePageLabel.title}</h3>

            <div className="list-baggage flex-between">
                <div className={'baggage flex-between active'}>
                    <img src="/images/baggage-5kg.svg" alt="baggage" />
                    <p>{baggagePageLabel.baggage_weights.split('/')[0]}</p>
                </div>

                <div className={`baggage flex-between ${is10kgSelected ? 'active' : ''}`}>
                    <img
                        src={is10kgSelected
                            ? "/images/baggage-10kg-active.svg"
                            : "/images/baggage-10kg-disabled.svg"
                        }
                        alt="baggage"
                    />
                    <p>{baggagePageLabel.baggage_weights.split('/')[1]}</p>
                    <button className='baggage-add-btn' onClick={toggle10kgBaggage}>
                        {is10kgSelected ? baggagePageLabel.remove_btn_text : baggagePageLabel.add_btn_text}
                    </button>
                </div>
            </div>

            {bookingPostData.return_date && (
                <div className="choose-direction">
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id={`check-${elem.ticket_id}`}
                            checked={isSameForBothWays}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={`check-${elem.ticket_id}`}>
                            {baggagePageLabel.direction_warning_text}
                        </label>
                    </div>

                    {!isSameForBothWays && (
                        <div className="directions flex-between">
                            <div
                                className={`box flex-center ${selectedDirection === 'first' ? 'active' : ''}`}
                                onClick={() => handleDirectionChange('first')}
                            >
                                <img src="/images/plane-flight.svg" alt="plane-flight" />
                                <p>{bookingPostData.from_here} - {bookingPostData.to_there}</p>
                            </div>

                            <div
                                className={`box flex-center ${selectedDirection === 'second' ? 'active' : ''}`}
                                onClick={() => handleDirectionChange('second')}
                            >
                                <img src="/images/plane-arrive.svg" alt="plane-arrive" />
                                <p>{bookingPostData.to_there} - {bookingPostData.from_here}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
