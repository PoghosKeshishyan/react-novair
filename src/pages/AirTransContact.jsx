import { TopHeading } from "../components/AirTransContact/TopHeading";
import { AirContact } from "../components/AirTransContact/AirContact";
import { InfoForTransfer } from "../components/AirTransContact/InfoForTransver";
import { ImportInfo } from "../components/AirTransContact/InportInfo";
import "../components/AirTransContact/AirTransContact.css";
import { useState, useEffect, useContext } from "react";
import axios from "../axios";
import { Loading } from "../components/Loading";
import { LanguageContext } from "../context/LanguageContext";

export function AirTransContact() {


  const [headingData, setHeadingData] = useState(null);
  const [airContact, setAirContact] = useState(null);
  const [transferContent, setTransferContent] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const {currentLang} = useContext(LanguageContext);


  useEffect(() => {
    const loadingData = async () => {
      try {
        const [
          resHeading,
          resAirContact,
          resInForTransfer,
          resImportInfo
        ] = await Promise.all([
          axios.get("top_heading_air_trans?lang="+currentLang),
          axios.get("air_trans_contact?lang="+currentLang),
          axios.get("inf_for_transfer?lang="+currentLang),
          axios.get("import_info?lang="+currentLang)
        ]);

        setHeadingData(resHeading.data.results[0]);
        setAirContact(resAirContact.data.results[0]);
        setTransferContent(resInForTransfer.data.results[0]);
        setInfo(resImportInfo.data.results[0]);
        setLoading(false);

      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    loadingData();
  }, [currentLang]);


  return (
    <div className="AirTransContact container as-page">
      <div className="row">

        {loading && <Loading />}
        {headingData && <TopHeading headingData={headingData} />}
        {airContact && <AirContact airContact={airContact} />}
        {transferContent && <InfoForTransfer transferContent={transferContent} />}
        {info && <ImportInfo info={info} />}

      </div>
    </div>
  );
}
