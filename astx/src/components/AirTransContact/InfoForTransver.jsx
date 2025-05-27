



export function InfoForTransfer({transferContent}) {

  if (!transferContent) {
    return <p>Loading...</p>;
  }

  return (
    <div className="air_trans_contact_page_row_box">
      <h2 className="air_trans_contact_page_heading">
        {transferContent.heading}
      </h2>
      <p className="air_trans_contact_page_text">
        {transferContent.text}
      </p>
      <h4 className="air_trans_contact_page_subheading">
        {transferContent.subheading}
      </h4>
      <ul className="air_trans_contact_page_list">
        {transferContent?.list?.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>

    </div>
  );
}
