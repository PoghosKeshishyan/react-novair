export function TopHeading({headingData}) {



  return (
    <h4 className="air_trans_contact_page_top_subheading">
      <span className="subheading_page_name">{headingData.subheading}</span>
      {headingData?.sections?.map(section => (
        <span key={section.id} className="breadcrumb-section">
          <span className="img_div">
            <img src="/images/arrow-right.svg" alt="arrow" />
          </span>
          <span className="subheading_page_name_to">{section.text}</span>
        </span>
      ))}
    </h4>
  );
}
