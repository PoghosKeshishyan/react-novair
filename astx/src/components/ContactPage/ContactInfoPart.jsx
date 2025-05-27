export function ContactInfoPart({ contactInfo }) {
     if (!contactInfo) {
    return <p>Loading...</p>;
  }
  return (
    <div className="ContactInfoPart">
      {contactInfo?.contact?.map(contact => (
        <div key={contact.id} className="inner_box">
          <span>{contact.label}</span>
          <a href="/">{contact.value}</a>
        </div>
      ))}

      <div>
          {contactInfo?.support_text?.map(support => (
            <p key={support.id}>{support.text}</p>
          ))}
      </div>
    </div>
  );
}
