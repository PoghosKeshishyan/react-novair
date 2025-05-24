import './FlightTickets.css';

export function FlightTickets({ logo, selectedFlights, setSelectedFlights, departure_flights, bookingResultsPageLabel }) {
  const calculateDuration = (startTime, endTime) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    let duration = endTotalMinutes - startTotalMinutes;

    if (duration < 0) {
      duration += 24 * 60;
    }

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours} hours ${minutes} mins`;
  };

  const calculateSumOfTickets = (tickets) => {
    const sum = tickets.reduce((acc, elem) => acc + +elem.price, 0);
    return new Intl.NumberFormat('de-DE').format(sum);
  };

  return (
    <div className="FlightTickets">
      {
        departure_flights.map(elem => (
          <div className="ticket" key={elem.id}>
            <div className="logo">
              <img src={logo.logo} alt="logo" />
              Novair Airlines
            </div>

            <div className="time-container">
              <div className='time-box'>
                <div className="time">{elem.departure_time}</div>
                <div className="descr">{elem.flight_airport_short_name}</div>
              </div>

              <div className="border-dashed"></div>

              <div className="time-box">
                <div className="time hours">{calculateDuration(elem.departure_time, elem.arrival_time)}</div>
                <div className="descr">{bookingResultsPageLabel.transit_text}</div>
              </div>

              <div className="border-dashed"></div>

              <div className='time-box'>
                <div className="time">{elem.arrival_time}</div>
                <div className="descr">{elem.arrival_airport_short_name}</div>
              </div>
            </div>

            <div className="price">
              <div className="price_value">{calculateSumOfTickets(elem.tickets)} ֏</div>
              <button 
                className={`btn ${selectedFlights.flight.id === elem.id ? "selected" : ""}`} 
                onClick={() => setSelectedFlights((prev) => {return {...prev, flight: elem}})}
              >
                {
                  selectedFlights.flight.id === elem.id ? bookingResultsPageLabel.selected_btn_text : bookingResultsPageLabel.select_btn_text
                }
              </button>
            </div>
          </div>
        ))
      }
    </div>
  );
}