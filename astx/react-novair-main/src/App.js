import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer/Footer";
import { BaggagePage } from "./pages/BaggagePage";
import { SeatChoicePage } from "./pages/SeatChoicePage";
import { OnlineRegistarationPage } from "./pages/OnlineRegistarationPage";
import { AirTransContact } from "./pages/AirTransContact";
import { TransportationConditions } from "./pages/TransportationConditions";
import { CertificatesPage } from "./pages/CertificatesPage";
import { ContactPage } from "./pages/ContactPage";

export default function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/baggage" element={<BaggagePage />} />
        <Route path="/services/seat-choice" element={<SeatChoicePage/>}/>
        <Route path="/services/online-registaration" element={<OnlineRegistarationPage/>}/>
        <Route path="/information/pass/air-trans-contact" element={<AirTransContact />} />
        <Route path="/information/transportation-conditions" element={<TransportationConditions />} />
        <Route path="/about/certificates" element={<CertificatesPage/>}/>
        <Route path="/about/contact" element={<ContactPage/>}/>
      </Routes>

      <Footer />
    </div>
  );
}
