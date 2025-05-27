export function CertificateDescr({ certificatDescr }) {
  return (
    <div className="certificares_page_row_box">
      <h2 className="certificares_page_heading">{certificatDescr.heading}</h2>
      {certificatDescr?.paragraphs?.map((item) => (
        <p key={item.id}>{item.text}</p>
      ))}
    </div>
  );
}
