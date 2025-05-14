
export function FromDropdown({ showDropdown, directions, setShowDropdown, onChangeBookingPostData }) {
    return (
        <div className={`dropdown ${showDropdown ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
            {
                directions.map(elem => (
                    <div
                        key={elem.id}
                        className="ticket flex-between"
                        onClick={() => {
                            onChangeBookingPostData({
                                from_here: elem.from_here,
                                flight_airport_name: elem.flight_airport_name,
                                flight_airport_short_name: elem.flight_airport_short_name,
                            });
                            setShowDropdown(false);
                        }}
                    >
                        <div className="ticket-left-side">
                            <p className="city">{elem.from_here}</p>
                            <p className="airport">{elem.flight_airport_name}</p>
                        </div>

                        <div className="right-side">{elem.flight_airport_short_name}</div>
                    </div>
                ))
            }
        </div>
    );
}