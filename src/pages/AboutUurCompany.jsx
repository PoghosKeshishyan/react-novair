import axios from "../axios";
import { useState, useEffect, useContext } from "react";
import { Loading } from "../components/Loading";
import { LanguageContext } from "../context/LanguageContext";
import { TopHeadingAboutUs } from "../components/AboutUs/TopHeadingAboutUs";
import { AboutDescr } from "../components/AboutUs/AboutDescr";
import "../components/AboutUs/About.css";

export function AboutourCompany() {
  const [aboutHeading, setAboutHeading] = useState(null);
  const [aboutDescr, setAboutDescr] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentLang } = useContext(LanguageContext);

  useEffect(() => {
    const loadingData = async () => {
      try {
        const [resHeading, resDescr] = await Promise.all([
          axios.get(
            "about_us/?lang=" + currentLang
          ),
          axios.get("about_descr/?lang=" + currentLang),
        ]);


        setAboutHeading(resHeading.data.results[0]);
        setAboutDescr(resDescr.data.results[0]);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };
    window.scrollTo(0, 0);
    loadingData();
  }, [currentLang]);

  return (
    <div className="AboutUs container as-page">
      <div className="row">
        {loading && <Loading />}
        {aboutHeading && <TopHeadingAboutUs aboutHeading={aboutHeading} />}
        {aboutDescr && <AboutDescr aboutDescr={aboutDescr} />}
      </div>
    </div>
  );
}
