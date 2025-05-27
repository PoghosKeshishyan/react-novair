import { TopHeading } from "../components/BaggagePage/TopHeading";
import { BaggagePageRowBox } from "../components/BaggagePage/BaggagePageRowBox";
import { BaggagePageDescr } from "../components/BaggagePage/BaggagePageDescr";
import axios from "../axios";
import { useEffect, useState } from "react";
import "../components/BaggagePage/BaggagePage.css"



export function BaggagePage() {

  const [headingData, setHeadingData ] = useState(null);
  const [baggageData, setBaggageData ] = useState(null);
  const [baggagePageDescr, setBaggagePageDescr] = useState(null);

useEffect(() => {
  const loadingData = async () => {
    try {
      const [
        resBaggage,
        resHeading,
        resDescr
      ] = await Promise.all([
        axios.get("baggage_row_box?lang=en"),
        axios.get("top_heading_baggage?lang=en"),
        axios.get("baggage_descr?lang=en")
      ]);

      setBaggageData(resBaggage.data.results[0]);
      setHeadingData(resHeading.data.results[0]);
      setBaggagePageDescr(resDescr.data.results[0]);

    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  loadingData();
}, []);

  
  return (
    <div className="BaggagePage container">
      <div className="row">
      {headingData && <TopHeading headingData={headingData}/>}
      {baggageData && <BaggagePageRowBox baggageData={baggageData}/>}
      {baggagePageDescr && <BaggagePageDescr baggagePageDescr={baggagePageDescr}/>}
      </div>
    </div>
  );
}
