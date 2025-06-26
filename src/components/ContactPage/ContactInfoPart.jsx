export function ContactInfoPart({ contactInfo }) {

  return (
    <div className="ContactInfo">
      {
        contactInfo?.map(item => (
        <div key={item.id} className="box">
          <div className="inner">
          <span>{item.title}</span>
         <img src={item.img_url}/>
          </div>
<p className="descr">{item.descr}</p>
        </div>
      ))}

    </div>
  );
}
