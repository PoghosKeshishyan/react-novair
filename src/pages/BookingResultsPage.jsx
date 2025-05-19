import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from '../context/LanguageContext';
import { Guide } from "../components/BookingResultsPage/Guide";
import { FlightDateSlider } from "../components/BookingResultsPage/FlightDateSlider";
import { FlightTickets } from '../components/BookingResultsPage/FlightTickets';
import { ReturnDateSlider } from "../components/BookingResultsPage/ReturnDateSlider";
import { ReturnTickets } from "../components/BookingResultsPage/ReturnTickets";
import axios from '../axios';
import dayjs from 'dayjs';
import '../stylesheets/BookingResultsPage.css';

export function BookingResultsPage() {
  const [logo, setLogo] = useState(null);
  const [bookingPostData, setBookingPostData] = useState(null);
  const [bookingResultsPageLabel, setBookingResultsPageLabel] = useState(null);
  const [bookingSearchResults, setBookingSearchResults] = useState(null);
  const [showContinueBtn, setShowContinueBtn] = useState(false);
  const [flightShowNoTicketText, setFlightShowNoTicketText] = useState(null);
  const [returnShowNoTicketText, setReturnShowNoTicketText] = useState(null);
  const [selectedFlights, setSelectedFlights] = useState({
    flight: {},
    return: {},
  });
  const { currentLang } = useContext(LanguageContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadingData = async () => {
      const resBookingLabel = await fetch('http://localhost:8000/booking_results_page_label?lang=' + currentLang)
      const res = await resBookingLabel.json();
      setBookingResultsPageLabel(res[0]);

      const resLogo = await axios.get('logo/');
      setLogo(resLogo.data.results[0]);

      const sessionDataBookingResult = JSON.parse(sessionStorage.getItem('bookingSearchResult'));
      setBookingSearchResults(sessionDataBookingResult);

      const sessionDataBookingPost = JSON.parse(sessionStorage.getItem('bookingPostData'));
      setBookingPostData(sessionDataBookingPost);
      setSelectedFlights(prev => { return { ...prev, return: sessionDataBookingPost?.return_date ? {} : null } });
    }

    window.scrollTo(0, 0);
    loadingData();
  }, [currentLang]);

  useEffect(() => {
    showContinueBtnAction();
  }, [selectedFlights]);

  const handleFlightCalendarDays = async (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const newBookingPostData = { ...bookingPostData, departure_date: formattedDate, return_date: null };
    const newBookingPostDataForSessionStorage = { ...bookingPostData, departure_date: formattedDate }

    try {
      const res = await axios.post('search-flights/', newBookingPostData);
      setBookingSearchResults(prev => {
        return { ...prev, departure_flights: res.data.departure_flights };
      });
      setFlightShowNoTicketText(null);
      setSelectedFlights((prev) => { return { ...prev, flight: {} } });

      /* Save in Session storage */
      sessionStorage.setItem('bookingPostData', JSON.stringify(newBookingPostDataForSessionStorage));
      setBookingPostData(newBookingPostDataForSessionStorage);

      const bookingSearchResultInSessionStorage = JSON.parse(sessionStorage.getItem('bookingSearchResult'));
      const bookingSearchResult = { ...bookingSearchResultInSessionStorage, departure_flights: res.data.departure_flights };
      sessionStorage.setItem('bookingSearchResult', JSON.stringify(bookingSearchResult));
    } catch (error) {
      setFlightShowNoTicketText(error.response.data[currentLang]);
      setBookingSearchResults(prev => {
        return { ...prev, departure_flights: null };
      });
      setShowContinueBtn(false);
    }
  };

  const handleReturnCalendarDays = async (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');

    const newBookingPostData = {
      "from_here": bookingPostData.to_there,
      "to_there": bookingPostData.from_here,
      "departure_date": formattedDate,
      "return_date": null,
      "adult_count": bookingPostData.adult_count,
      "child_count": bookingPostData.child_count,
      "baby_count": bookingPostData.baby_count,
    };

    try {
      const res = await axios.post('search-flights/', newBookingPostData);
      setBookingSearchResults(prev => {
        return { ...prev, return_flights: res.data.departure_flights };
      });
      setReturnShowNoTicketText(null);

      setSelectedFlights((prev) => { return { ...prev, return: bookingPostData?.return_date ? {} : null } });

      /* Save in Local Storage bookingPostData */
      const bookingPostDataFromSessionStorage = { ...bookingPostData, return_date: formattedDate };
      sessionStorage.setItem('bookingPostData', JSON.stringify(bookingPostDataFromSessionStorage));
      setBookingPostData(bookingPostDataFromSessionStorage);

      const bookingSearchResultInSessionStorage = JSON.parse(sessionStorage.getItem('bookingSearchResult'));
      const newBookingSearchResult = { ...bookingSearchResultInSessionStorage, return_flights: res.data.departure_flights };
      sessionStorage.setItem('bookingSearchResult', JSON.stringify(newBookingSearchResult));
    } catch (error) {
      setReturnShowNoTicketText(error.response.data[currentLang]);
      setBookingSearchResults(prev => {
        return { ...prev, return_flights: null };
      });
      setShowContinueBtn(false);
    }
  };

  const showContinueBtnAction = () => {
    const isFlightSelected = Object.keys(selectedFlights.flight).length > 0;
    const isReturnNull = selectedFlights.return === null;
    const isReturnSelected = selectedFlights.return && Object.keys(selectedFlights.return).length > 0;

    if (isFlightSelected && (isReturnNull || isReturnSelected)) {
      setShowContinueBtn(true);
    } else {
      setShowContinueBtn(false);
    }
  };

  const handleContineBtn = () => {
    if (bookingPostData.departure_date > bookingPostData.return_date) {
      const respone = {
        am: "Մեկնելու օրը պետք է լինի վերադառնալու օրվանից առաջ:",
        en: "Departure date should be before return date.",
        ru: "Дата вылета должна быть раньше даты возвращения.",
      };

      return alert(respone[currentLang]);
    }

    sessionStorage.setItem('selectedFlights', JSON.stringify(selectedFlights));
    navigate('/booking/check-baggage');
  };

  return bookingResultsPageLabel && (
    <div className="BookingResultsPage container">
      <Guide guide_label={bookingResultsPageLabel.navigation} />

      {bookingPostData && <FlightDateSlider bookingPostData={bookingPostData} handleFlightCalendarDays={handleFlightCalendarDays} />}
      {bookingSearchResults?.departure_flights && <FlightTickets logo={logo} selectedFlights={selectedFlights} setSelectedFlights={setSelectedFlights} departure_flights={bookingSearchResults.departure_flights} bookingResultsPageLabel={bookingResultsPageLabel} />}
      {flightShowNoTicketText && <p className="flightShowNoTicketText">{flightShowNoTicketText}</p>}

      {bookingPostData && <ReturnDateSlider bookingPostData={bookingPostData} handleReturnCalendarDays={handleReturnCalendarDays} />}
      {bookingSearchResults?.return_flights && <ReturnTickets logo={logo} selectedFlights={selectedFlights} setSelectedFlights={setSelectedFlights} return_flights={bookingSearchResults.return_flights} bookingResultsPageLabel={bookingResultsPageLabel} />}
      {returnShowNoTicketText && <p className="returnShowNoTicketText">{returnShowNoTicketText}</p>}

      {showContinueBtn && <div className="continue_btn" onClick={handleContineBtn}>
        <button>Continue</button>
      </div>}
    </div>
  )
}