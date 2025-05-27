import { TopHeading } from "../components/AirTransContact/TopHeading";
import { AirContact } from "../components/AirTransContact/AirContact";
import { InfoForTransfer } from "../components/AirTransContact/InfoForTransver";
import { ImportInfo } from "../components/AirTransContact/InportInfo";
import "../components/AirTransContact/AirTransContact.css";
import { useState, useEffect } from "react";
import axios from "../axios";

export function AirTransContact() {


    const [headingData, setHeadingData] = useState(null);
    const [airContact, setAirContact] = useState(null);
    const [transferContent, setTransferContent] = useState(null);
    const [info, setInfo] = useState(null);

    

useEffect(() => {
  const loadingData = async () => {
    try {
      const [
        resHeading,
        resAirContact,
        resInForTransfer,
        resImportInfo
      ] = await Promise.all([
        axios.get("top_heading_air_trans?lang=en"),
        axios.get("air_trans_contact?lang=en"),
        axios.get("inf_for_transfer?lang=en"),
        axios.get("import_info?lang=en")
      ]);

      setHeadingData(resHeading.data.results[0]);
      setAirContact(resAirContact.data.results[0]);
      setTransferContent(resInForTransfer.data.results[0]);
      setInfo(resImportInfo.data.results[0]);

    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  loadingData();
}, []);


  return (
    <div className="AirTransContact container">
      <div className="row">

{headingData &&<TopHeading headingData={headingData} />}
{airContact && <AirContact airContact={airContact}/>}
{transferContent && <InfoForTransfer transferContent={transferContent}/>}
{info && <ImportInfo info={info}/>}

      </div>
    </div>
  );
}
