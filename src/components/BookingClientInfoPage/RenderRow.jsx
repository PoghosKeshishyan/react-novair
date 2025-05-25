export function RenderRow({ prefix, flightSeats, holdSeats, selectedSeat, setSelectedSeat, direction }) {
    const seatsInRow = flightSeats[direction].filter(seat => seat.seat_number.startsWith(prefix));

    return (
        <div className="seat-row">
            {seatsInRow.map(seat => (
                <div
                    key={seat.id}
                    className={`seat 
                        ${seat.is_taken ? 'taken' : ''} 
                        ${selectedSeat[direction] === seat ? 'selected' : ''}
                        ${holdSeats[direction].includes(seat.seat_number) ? 'selected' : ''}
                    `}
                        onClick={() => !seat.is_taken && setSelectedSeat(prev => {return {...selectedSeat, [direction]: seat}})}
                >
                    {seat.seat_number}
                </div>
            ))}
        </div>
    );
}