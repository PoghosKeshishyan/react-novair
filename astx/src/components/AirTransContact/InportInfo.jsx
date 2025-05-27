
export function ImportInfo({info}) {

  if (!info) {
    return <p>Loading...</p>;
  }

  return (
    <div className="air_trans_contact_page_row_box">
      <h2 className="air_trans_contact_page_heading">{info.heading}</h2>
      <ul className="important_information">
        {info?.list?.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
