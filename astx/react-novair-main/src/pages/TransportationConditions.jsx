import { TopHeading } from "../components/TransportationConditions/TopHeading";
import { Conditions } from "../components/TransportationConditions/Conditions";
import "../components/TransportationConditions/TransportationConditions.css"
import axios from "../axios";
import { useEffect, useState } from "react";

export function TransportationConditions() {


        const [headingData, setHeadingData] = useState(null);
        const [conditionsData, setConditionsData] = useState(null);

useEffect(() => {
  const loadingData = async () => {
    try {
      const [
        resHeading,
        resConditions
      ] = await Promise.all([
        axios.get("top_heading_transp?lang=en"),
        axios.get("transp_conditions?lang=en")
      ]);

      setHeadingData(resHeading.data.results[0]);
      setConditionsData(resConditions.data.results[0]);

    } catch (error) {
      console.error("There was an error fetching transport data:", error);
    }
  };

  loadingData();
}, []);


  return (
    <div className="TransportationConditions container">
      <div className="row">

     {headingData && <TopHeading headingData={headingData}/>}
      {conditionsData && <Conditions conditionsData={conditionsData}/> }

      </div>
    </div>
  );
}
