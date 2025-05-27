import "../components/CertificatePage/CertificatesPage.css";
import { TopHeading } from "../components/CertificatePage/TopHeading";
import { CertificateDescr } from "../components/CertificatePage/CertificateDescr";
import { CertificatesImages } from "../components/CertificatePage/CertificatesImages";
import axios from "../axios";
import { useState, useEffect, useContext } from "react";
import { Loading } from "../components/Loading";
import { LanguageContext } from "../context/LanguageContext";

export function CertificatesPage() {
  const [certificatHeading, setCertificatHeading] = useState(null);
  const [certificatDescr, setCertificatDescr] = useState(null);
  const [certificatImages, setCertificatImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const {currentLang} = useContext(LanguageContext);

  useEffect(() => {
    const loadingData = async () => {
      try {
        const [
          resHeading,
          resDescr,
          resImages
        ] = await Promise.all([
          axios.get("top_heading_certificate?lang="+currentLang),
          axios.get("certificate_descr?lang="+currentLang),
          axios.get("certificates_images?lang="+currentLang)
        ]);

        setCertificatHeading(resHeading.data.results[0]);
        setCertificatDescr(resDescr.data.results[0]);
        setCertificatImages(resImages.data.results[0]);
        setLoading(false);

      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    loadingData();
  }, [currentLang]);


  return (
    <div className="CertificatesPage container as-page">
      <div className="row">
        {loading && <Loading />}
        
        {certificatHeading && (
          <TopHeading certificatHeading={certificatHeading} />
        )}
        {certificatDescr && (
          <CertificateDescr certificatDescr={certificatDescr} />
        )}
        {certificatImages && (
          <CertificatesImages certificatImages={certificatImages} />
        )}
      </div>
    </div>
  );
}
