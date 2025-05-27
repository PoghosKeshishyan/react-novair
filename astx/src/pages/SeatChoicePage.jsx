import { TopHeading } from "../components/SeatChoicePage/TopHeading";
import { SeatChoiceDescr } from "../components/SeatChoicePage/SeatChoiceDescr";
import { SeatChoicePrice } from "../components/SeatChoicePage/SeatChoicePrice";
import "../components/SeatChoicePage/SeatCoicePage.css";
import axios from "../axios";
import { useEffect, useState } from "react";


export function SeatChoicePage() {

  const [headingData, setHeading] = useState(null);
  const [choiceDescr, setDescr] = useState(null);
  const [choicePrice, setPrice] = useState(null);

useEffect(() => {
  const loadingData = async () => {
    try {
      const [
        resHeading,
        resDescr,
        resPrice
      ] = await Promise.all([
        axios.get("top_heading_seat_choice?lang=en"),
        axios.get("seat_choice_description?lang=en"),
        axios.get("seat_choice_price?lang=en")
      ]);

      setHeading(resHeading.data.results[0]);
      setDescr(resDescr.data.results[0]);
      setPrice(resPrice.data.results[0]);

    } catch (error) {
      console.error("There was an error fetching seat choice data:", error);
    }
  };

  loadingData();
}, []);



  return (

 
    <div className="SeatChoicePage container">
      <div className="row">

     {headingData && <TopHeading headingData={headingData}/>}
      {choiceDescr && <SeatChoiceDescr choiceDescr={choiceDescr}/>}
      {choicePrice && <SeatChoicePrice choicePrice={choicePrice}/>}

      </div>
    </div>
  );
}
