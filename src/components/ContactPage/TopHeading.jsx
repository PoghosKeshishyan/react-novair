

export function TopHeading({headingContact}){
  

    return(

        <h4 className="contact_us_page_top_subheading">
        <span className="subheading_page_name">{headingContact.section}</span>
        <span className="img_div">
          <img src="/images/contact/arrow-right.svg" alt="arrow" />
        </span>
        <span className="subheading_page_name_to">{headingContact.page}</span>
      </h4>
    )
}