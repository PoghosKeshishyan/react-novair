

export function TopHeadingAboutUs({aboutHeading}){

    return(
          <h4 className="aboutHeading_page_top_subheading">
      <span className="aboutHeading_page_name">{aboutHeading.section}</span>
      <span className="img_div">
          <img src="/images/arrow-right.svg" alt="arrow" />
      </span>
      <span className="subheading_page_name_to">{aboutHeading.page}</span>
    </h4>
    )
}