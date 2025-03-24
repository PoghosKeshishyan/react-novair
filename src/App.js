import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <div className="App">
      <Header />  {/*   css-@ kisat   */}

      <Routes>
        <Route path="/" element={<HomePage />}  />
      </Routes>

    </div>
  )
}
