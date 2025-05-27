


export function AirContact({airContact}) {


  if (!airContact) {
    return <p>Loading...</p>;
  }

  return (
    <div className="air_trans_contact_page_row_box">
      <h2 className="online_registration_page_heading">{airContact.heading}</h2>
      <p className="air_trans_contact_page_text">{airContact.text}</p>
      <h4 className="air_trans_contact_page_subheading">{airContact.subheading}</h4>
      <ul className="air_trans_contact_page_list">
        {airContact?.list?.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
