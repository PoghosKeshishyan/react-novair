import "../components/OnlineRegistarationPage/OnlineRegistrationPage.css";
import { TopHeading } from "../components/OnlineRegistarationPage/TopHeading";
import { OnlineConditions } from "../components/OnlineRegistarationPage/OnlineConditions";
import { OnlineHowDo } from "../components/OnlineRegistarationPage/OnlineHowDo";
import { OnlineInfo } from "../components/OnlineRegistarationPage/OnlineInfo";
import { OnlineImportantInfo } from "../components/OnlineRegistarationPage/OnlineImportantInfo";
import { OnlineCheckIn } from "../components/OnlineRegistarationPage/OnlineCheckIn";
import axios from "../axios";
import { useContext, useEffect, useState } from "react";
import { Loading } from '../components/Loading'
import { LanguageContext } from "../context/LanguageContext";

export function OnlineRegistarationPage() {
  
  const [headingData, setHeadingData] = useState(null);
  const [conditionsData, setConditionsData] = useState(null);
  const [howDoData, setHowDoData] = useState(null);
  const [infoData, setInfoData] = useState(null);
  const [importantInfoData, setImportantInfoData] = useState(null);
  const [checkInData, setCheckInData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {currentLang} = useContext(LanguageContext);

  useEffect(() => {
    const lodingData = async () => {
      try {
        const [
          resHeader,
          resConditions,
          resHowDo,
          resInfo,
          resImportantInfo,
          resCheckIn
        ] = await Promise.all([
          axios.get("top_heading_online_reg?lang="+currentLang),
          axios.get("online_conditions?lang="+currentLang),
          axios.get("online_how_do?lang="+currentLang),
          axios.get("online_info?lang="+currentLang),
          axios.get("online_important_info?lang="+currentLang),
          axios.get("online_checkin_text?lang="+currentLang)
        ]);

        setLoading(false);

        setHeadingData(resHeader.data.results[0]);
        setConditionsData(resConditions.data.results[0]);
        setHowDoData(resHowDo.data.results[0]);
        setInfoData(resInfo.data.results[0]);
        setImportantInfoData(resImportantInfo.data.results[0]);
        setCheckInData(resCheckIn.data.results[0]);
       } catch (error) {
        console.error(error);
      }
    };
    lodingData();
  }, [currentLang]);


  return (
    <div className="OnlineRegistarationPage container as-page">
      <div className="row">
        {loading && <Loading />}

        {headingData && <TopHeading headingData={headingData} />}
        {conditionsData && <OnlineConditions conditionsData={conditionsData} />}
        {howDoData && <OnlineHowDo howDoData={howDoData} />}
        {infoData && <OnlineInfo infoData={infoData} />}
        {importantInfoData && <OnlineImportantInfo importantInfoData={importantInfoData}/>}
        {checkInData && <OnlineCheckIn checkInData={checkInData} />}
      </div>
    </div>
  );
}
