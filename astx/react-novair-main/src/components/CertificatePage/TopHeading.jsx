import React from "react";
export function TopHeading({certificatHeading}) {

  if (!certificatHeading) {
    return <p>Loading...</p>
  }

  return (
    <h4 className="certificares_page_top_subheading">
      {certificatHeading?.path?.map((item, index) => (
        <React.Fragment key={item.id}>
          <span className={index === 0 ? "subheading_page_name" : "subheading_page_name_to"}>
            {item.label}
          </span>
          <span className="img_div">
            <img src="/images/services/arrow-right.svg" alt="arrow" />
          </span>
        </React.Fragment>
      ))}
    </h4>
  );
}
