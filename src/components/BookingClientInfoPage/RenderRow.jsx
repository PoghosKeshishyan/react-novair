export function RenderRow({ prefix, flightSeats, onChangeFlightSeats }) {
    const seatsInRow = flightSeats.filter(seat => seat.seat_number.startsWith(prefix));

    return (
        <div className="seat-row">
            {seatsInRow.map(seat => (
                <div
                    key={seat.id}
                    className={`seat 
                        ${seat.is_taken ? 'taken' : ''} 
                        ${seat.is_selected ? 'selected' : ''}`}
                    onClick={() => !seat.is_taken && onChangeFlightSeats(seat.id)}
                >
                    {seat.seat_number}
                </div>
            ))}
        </div>
    );
}