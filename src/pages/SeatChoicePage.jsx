import { TopHeading } from "../components/SeatChoicePage/TopHeading";
import { SeatChoiceDescr } from "../components/SeatChoicePage/SeatChoiceDescr";
import { SeatChoicePrice } from "../components/SeatChoicePage/SeatChoicePrice";
import "../components/SeatChoicePage/SeatCoicePage.css";
import axios from "../axios";
import { useContext, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { LanguageContext } from "../context/LanguageContext";


export function SeatChoicePage() {

  const [headingData, setHeading] = useState(null);
  const [choiceDescr, setDescr] = useState(null);
  const [choicePrice, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const {currentLang} = useContext(LanguageContext);

  useEffect(() => {
    const loadingData = async () => {
      try {
        const [
          resHeading,
          resDescr,
          resPrice
        ] = await Promise.all([
          axios.get("top_heading_seat_choice?lang="+currentLang),
          axios.get("seat_choice_description?lang="+currentLang),
          axios.get("seat_choice_price?lang="+currentLang)
        ]);

        setHeading(resHeading.data.results[0]);
        setDescr(resDescr.data.results[0]);
        setPrice(resPrice.data.results[0]);

        setLoading(false);

      } catch (error) {
        console.error("There was an error fetching seat choice data:", error);
      }
    };

    loadingData();
  }, [currentLang]);



  return (


    <div className="SeatChoicePage container as-page">
      <div className="row">
        { loading && <Loading /> }
        {headingData && <TopHeading headingData={headingData} />}
        {choiceDescr && <SeatChoiceDescr choiceDescr={choiceDescr} />}
        {choicePrice && <SeatChoicePrice choicePrice={choicePrice} />}

      </div>
    </div>
  );
}
