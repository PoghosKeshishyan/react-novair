
export function OnlineHowDo({ howDoData }) {

  if (!howDoData) return <p>Loading...</p>;

  return (
    <div className="online_registration_page_row_box">
      <h2 className="online_registration_page_heading">
        {howDoData.heading}
      </h2>

      <div className="online_registration_page_container">
        {howDoData.paragraphs.map((item) => (
          <div key={item.id} className="online_registration_page_inner_box">
            <h4 className="step">{item.step}</h4>
            <img src="../images/img01.svg" alt="image" />
            <h3 className="inner_box_heading">{item.title}</h3>
            <p className="online_registration_page_text">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
