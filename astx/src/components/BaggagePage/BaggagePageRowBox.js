export function BaggagePageRowBox({baggageData}) {
  return (
    <div className="BaggagePageRowBox">
        <div className="baggage_page_row_box">
          <h2 className="baggage_page_heading">
           {baggageData.heading}</h2>
           <p>{baggageData.text}</p>
        </div>
        </div>
     

  )}