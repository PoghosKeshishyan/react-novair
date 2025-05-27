export function BaggagePageDescr({ baggagePageDescr }) {

  if (!baggagePageDescr) {
    return <p>Loading...</p>;
  }

  return (
    <div className="baggage_page_row_box">
      <h2 className="baggage_page_heading">{baggagePageDescr.heading}</h2>

      <div className="baggage_page_container">
        {baggagePageDescr?.groups?.map((group) => (
          <ul className="baggage_page_inner_box" key={group.id}>
            <li>
              <h4 className="inner_box_heading">{group.type}</h4>
              <p className="inner_box_text_01">{group.note}</p>
            </li>
            <li>
              <h4 className="inner_box_subheading">{group.type}</h4>
              {group?.hand_luggage?.map((item) => (
                <p className="inner_box_text" key={item.id}>{item.text}</p>
              ))}
            </li>
            <li>
              <h4 className="inner_box_subheading">{group.type}</h4>
              {group?.baggage?.map((item) => (
                <p className="inner_box_text" key={item.id}>{item.text}</p>
              ))}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
