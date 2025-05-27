export function TopHeading({headingData}){


    return(
              
        <h4 className="baggage_page_top_subheading">
          <span className="subheading_page_name">{headingData.section}</span>
            <img src="../images/arrow-right.svg" alt="img" />
          <span className="subheading_page_name_to">{headingData.page}</span>
        </h4>
    )
}