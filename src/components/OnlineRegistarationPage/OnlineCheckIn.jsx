import { NavLink as Link } from "react-router-dom";

export function OnlineCheckIn({checkInData }) {

  if (!checkInData) return <p>Loading...</p>;

  return (
    <div className="online_registration_page_row_box">
      <h4 className="online_registration_page_subheading">
        {checkInData.description}
      </h4>

      <Link to={"/"}>
        <button className="btn">{checkInData.button}</button>
      </Link>
    </div>
  );
}
