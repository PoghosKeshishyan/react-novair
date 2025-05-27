import { TopHeading } from "../components/TransportationConditions/TopHeading";
import { Conditions } from "../components/TransportationConditions/Conditions";
import "../components/TransportationConditions/TransportationConditions.css"
import axios from "../axios";
import { useContext, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { LanguageContext } from "../context/LanguageContext";

export function TransportationConditions() {

  const [headingData, setHeadingData] = useState(null);
  const [conditionsData, setConditionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {currentLang} = useContext(LanguageContext);

  useEffect(() => {
    const loadingData = async () => {
      try {
        const [
          resHeading,
          resConditions
        ] = await Promise.all([
          axios.get("top_heading_transp?lang="+currentLang),
          axios.get("transp_conditions?lang="+currentLang)
        ]);

        setHeadingData(resHeading.data.results[0]);
        setConditionsData(resConditions.data.results[0]);

        setLoading(false);

      } catch (error) {
        console.error("There was an error fetching transport data:", error);
      }
    };

    loadingData();
  }, [currentLang]);


  return (
    <div className="TransportationConditions container as-page">
      <div className="row">

        {loading && <Loading />}
        {headingData && <TopHeading headingData={headingData} />}
        {conditionsData && <Conditions conditionsData={conditionsData} />}

      </div>
    </div>
  );
}
