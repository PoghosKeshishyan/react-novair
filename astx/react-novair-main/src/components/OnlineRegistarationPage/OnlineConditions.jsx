
export function OnlineConditions({ conditionsData }) {

  if (!conditionsData) return <p>Loading...</p>;

  return (
    <div className="online_registration_page_row_box">
      <h2 className="online_registration_page_heading">{conditionsData.title}</h2>
      <ul className="online_check_in">
        {conditionsData.conditions.map(condition => (
          <li key={condition.id}>{condition.text}</li>
        ))}
      </ul>
    </div>
  );
}
