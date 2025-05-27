

export function ContactImagePart({ contactImage }) {

  

  if (!contactImage) {
    return <p>Loading...</p>;
  }
  
  return (


    <div className="contact_image">
      <img src={contactImage.image} alt="contact-image" />
    </div>
  );
}