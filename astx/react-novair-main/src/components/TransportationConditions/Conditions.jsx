import { NavLink as Link } from "react-router-dom";

export function Conditions({conditionsData}) {
  return (
   
    <div className="transp_conditions_page_row_box">
      <h2 className="transp_conditions_page_heading">{conditionsData.heading}</h2>

      <ul className="transp_conditions_page_info_list">
        {conditionsData.items.map(({ id, item, route }) => (
          <li key={id}>
            <Link to={route || "/"}>
              {item}
            </Link>
            <img src="/images/arrow-to-right.svg" alt="arrow" />
          </li>
        ))}
      </ul>
    </div>
  );
}
