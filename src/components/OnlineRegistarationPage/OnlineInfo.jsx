
export function OnlineInfo({infoData}){

  if(!infoData) return <p>Loading...</p>

    return(

        <div className="ronline_registration_page_row_box">
        <h2 className="online_registration_page_heading">{infoData.heading}
        </h2>
        <p className="online_registration_page_text">
         {infoData.page_text}
        </p>
        <h4 className="online_registration_page_subheading">
         {infoData.subheading}
        </h4>
        <ul className="online_registration_page_list">
          {
            infoData.items.map(item =>(
              <li key={item.id}>{item.text}</li>
            ))
          }
        </ul>
        </div>
        
    )
}