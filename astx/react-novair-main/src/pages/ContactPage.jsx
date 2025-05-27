import "../components/ContactPage/ContactPage.css";
import { TopHeading } from "../components/ContactPage/TopHeading";
import { ContactImagePart } from "../components/ContactPage/ContactImagePart";
import { ContactInfoPart } from "../components/ContactPage/ContactInfoPart";
import axios from "../axios";
import { useEffect, useState } from "react";

export function ContactPage() {
  const [headingContact, setHeadingContact] = useState(null);
  const [contactImage, setContactImage] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);

useEffect(() => {
  const loadingData = async () => {
    try {
      const [
        resHeading,
        resImage,
        resInfo
      ] = await Promise.all([
        axios.get("top_heading_contact"),
        axios.get("contact_images"),
        axios.get("contact_info")
      ]);

      setHeadingContact(resHeading.data.results[0]);
      setContactImage(resImage.data.results[0]);
      setContactInfo(resInfo.data.results[0]);

    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  loadingData();
}, []);


  return (
    <div className="ContactPage container">
      <div className="row">
        {headingContact && <TopHeading headingContact={headingContact} />}
        {contactImage && <ContactImagePart contactImage={contactImage} />}
        {contactInfo && <ContactInfoPart contactInfo={contactInfo} />}
      </div>
    </div>
  );
}
