import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <div className="App">
      <Header /> 

      <Routes>
        <Route path="/" element={<HomePage />}  />
      </Routes>

      <Footer />
    </div>
  )
}
