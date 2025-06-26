import "../components/ContactPage/ContactPage.css";
import { ContactIntro } from "../components/ContactPage/ContactIntro";
import { TopHeading } from "../components/ContactPage/TopHeading";
import { ContactMap } from "../components/ContactPage/ContactMap";
import { ContactInfoPart } from "../components/ContactPage/ContactInfoPart";
import axios from "../axios";
import { useContext, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { LanguageContext } from "../context/LanguageContext";

export function ContactPage() {
  const [headingContact, setHeadingContact] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  const [contactInrto, setContactInrto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentLang } = useContext(LanguageContext);

  useEffect(() => {
    const loadingData = async () => {
      try {
        const [resHeading, resInfo, resIntro] = await Promise.all([
          axios.get(
            "top_contact?lang=" + currentLang
          ),
          axios.get("contact_new_info?lang=" + currentLang),
          axios.get("contact_intro?lang=" + currentLang),
        ]);

        setHeadingContact(resHeading.data.results[0]);
        setContactInfo(resInfo.data.results);
        setContactInrto(resIntro.data.results[0]);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };
    window.scrollTo(0, 0);
    loadingData();
  }, [currentLang]);

  return (
    <div className="ContactPage" style={{marginTop: '93px'}}>
      {loading && <Loading />}
      {contactInrto && <ContactIntro contactInrto={contactInrto} />}
      <div className="container">
        <div className="row">
          {headingContact && <TopHeading headingContact={headingContact} />}
          {contactInfo && <ContactInfoPart contactInfo={contactInfo} />}
        </div>
      </div>
      <ContactMap />
    </div>
  );
}
