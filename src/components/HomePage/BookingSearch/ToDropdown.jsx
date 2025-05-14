
export function ToDropdown({ showDropdown, directions, setShowDropdown, onChangeBookingPostData }) {
    return (
        <div className={`dropdown ${showDropdown ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
            {
                directions.map(elem => (
                    <div
                        key={elem.id}
                        className="ticket flex-between"
                        onClick={() => {
                            onChangeBookingPostData({
                                to_there: elem.to_there,
                                arrival_airport_name: elem.arrival_airport_name,
                                arrival_airport_short_name: elem.arrival_airport_short_name,
                            });
                            setShowDropdown(false);
                        }}
                    >
                        <div className="ticket-left-side">
                            <p className="city">{elem.to_there}</p>
                            <p className="airport">{elem.arrival_airport_name}</p>
                        </div>

                        <div className="right-side">{elem.arrival_airport_short_name}</div>
                    </div>
                ))
            }
        </div>
    );
}