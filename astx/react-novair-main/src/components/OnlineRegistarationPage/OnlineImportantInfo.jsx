

export function OnlineImportantInfo({importantInfoData}){
 if (!importantInfoData) {
    return <div>Loading...</div>;
  }
    return(

        
<div className="online_registration_page_row_box">
<h2 className="online_registration_page_heading">
 {importantInfoData.heading}
</h2>
 <ul className="important_information">
{
  importantInfoData.items.map(item => (
    <li key={item.id}>{item.title}</li>
   
  ))
}
 </ul>

</div>
    )
}