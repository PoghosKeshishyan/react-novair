import { Route, Routes } from "react-router";
import { Header } from "./components/Header/Header";
import { HomePage } from "./pages/HomePage";
import { Footer } from "./components/Footer/Footer";
import { BookingResultsPage } from "./pages/BookingResultsPage";

export default function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingResultsPage />}>
          {/* add a route for the booking results page */}
        </Route>
      </Routes>

      <Footer />
    </div>
  )
}
