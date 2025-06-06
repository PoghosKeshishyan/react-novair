import { TopHeading } from "../components/BaggagePage/TopHeading";
import { BaggagePageRowBox } from "../components/BaggagePage/BaggagePageRowBox";
import { useContext, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { LanguageContext } from "../context/LanguageContext";
import axios from "../axios";
import "../components/BaggagePage/BaggagePage.css"



export function BaggagePage() {

  const [headingData, setHeadingData] = useState(null);
  const [baggageData, setBaggageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {currentLang} = useContext(LanguageContext);

  useEffect(() => {
    const loadingData = async () => {
      try {
        const [
          resBaggage,
          resHeading,
          resDescr
        ] = await Promise.all([
          axios.get("baggage_row_box?lang="+currentLang),
          axios.get("top_heading_baggage?lang="+currentLang),
        ]);

        setBaggageData(resBaggage.data.results[0]);
        setHeadingData(resHeading.data.results[0]);

        setLoading(false);

      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    loadingData();
  }, [currentLang]);


  return (
    <div className="BaggagePage container as-page">
      <div className="row">
        {loading && <Loading />}
        {headingData && <TopHeading headingData={headingData} />}
        {baggageData && <BaggagePageRowBox baggageData={baggageData} />}
      </div>
    </div>
  );
}
