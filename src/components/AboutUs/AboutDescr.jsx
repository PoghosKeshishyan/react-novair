export function AboutDescr({ aboutDescr }) {
  return (
    <div className="about_us">
      <h2 className="heading">{aboutDescr.title}</h2>
      <p className="descr">{aboutDescr.descr}</p>
    </div>
  );
}
