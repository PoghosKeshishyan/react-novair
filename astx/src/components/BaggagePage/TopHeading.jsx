export function TopHeading({ headingData }) {
  
  if (!headingData){
     return <p>Loading...</p>;
    }
  return (
    <h4 className="online_registration_page_top_subheading">
      <span className="subheading_page_name">{headingData.section}</span>
      <span className="img_div">
        <img src="../images/services/arrow-right.svg" alt="arrow" />
      </span>
      <span className="subheading_page_name_to">{headingData.page}</span>
    </h4>
  );
}
