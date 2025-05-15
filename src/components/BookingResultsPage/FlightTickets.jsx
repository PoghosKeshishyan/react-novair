import './FlightTickets.css';

export function FlightTickets({ departure_flights }) {
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
    return sum;
  };

  console.log(departure_flights);


  return (
    <div className="FlightTickets">

      {
        departure_flights.map(elem => {
          if (elem.tickets.length) {
            return (
              <div className="ticket" key={elem.id}>
                <div className="logo">
                  <img src="/images/header/logo.svg" alt="logo" />
                  Novair Airlines
                </div>

                <div className="time-container">
                  <div className='time-box'>
                    <div className="time">{elem.departure_time}</div>
                    <div className="descr">{elem.airport_short_name}</div>
                  </div>

                  <div className="border-dashed"></div>

                  <div className="time-box">
                    <div className="time hours">{calculateDuration(elem.departure_time, elem.arrival_time)}</div>
                    <div className="descr">1 Transit</div>
                  </div>

                  <div className="border-dashed"></div>

                  <div className='time-box'>
                    <div className="time">{elem.arrival_time}</div>
                    <div className="descr">JKT</div>
                  </div>
                </div>

                <div className="price">
                  <div className="price_value">{calculateSumOfTickets(elem.tickets)} ֏</div>
                  <button className='btn'>Select</button>
                </div>
              </div>
            )
          }
        })
      }

    </div>
  );
}