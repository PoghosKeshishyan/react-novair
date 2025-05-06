import './FlightTickets.css';

export function FlightTickets({ departure_flights }) {
  return (
    <div className="FlightTickets">
      {/* {
        departure_flights.map(elem => (
          <div className="ticket" key={elem.id}>
            {/* {console.log(elem)} */}

            {/* <div className="logo">
              <img src="/images/header/logo.svg" alt="logo" />
              Novair Airlines
            </div>

            <div className="time-container">

              <div className='time-box'>
                <div className="time">{elem.departure_time}</div>
                <div className="descr">EVN</div>
              </div>

              <div className="border-dashed"></div>

              <div className="time-box">
                <div className="time hours">4 hours 10 mins</div>
                <div className="descr">1 Transit</div>
              </div>

              <div className="border-dashed"></div>

              <div className='time-box'>
                <div className="time">{elem.arrival_time}</div>
                <div className="descr">JKT</div>
              </div>

            </div>

            <div className="price">
              <div className="price_value">$890</div>
              <button className='btn'>Select</button>
            </div>

          </div>
        )) */}
      {/* } */} 

      {/* <div className="ticket">

        <div className="logo">
          <img src="/images/header/logo.svg" alt="logo" />
          Novair Airlines
        </div>

        <div className="time-container">

          <div className='time-box'>
            <div className="time">13:45</div>
            <div className="descr">EVN</div>
          </div>

          <div className="border-dashed"></div>

          <div className="time-box">
            <div className="time hours">4 hours 10 mins</div>
            <div className="descr">1 Transit</div>
          </div>

          <div className="border-dashed"></div>

          <div className='time-box'>
            <div className="time">17:55</div>
            <div className="descr">JKT</div>
          </div>

        </div>

        <div className="price">
          <div className="price_value">$890</div>
          <button className='btn'>Select</button>
        </div>

      </div> */}

    </div>
  )
}
