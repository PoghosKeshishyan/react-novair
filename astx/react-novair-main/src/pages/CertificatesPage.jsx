import "../components/CertificatePage/CertificatesPage.css";
import { TopHeading } from "../components/CertificatePage/TopHeading";
import { CertificateDescr } from "../components/CertificatePage/CertificateDescr";
import { CertificatesImages } from "../components/CertificatePage/CertificatesImages";
import axios from "../axios";
import { useState, useEffect } from "react";

export function CertificatesPage() {
  const [certificatHeading, setCertificatHeading] = useState(null);
  const [certificatDescr, setCertificatDescr] = useState(null);
  const [certificatImages, setCertificatImages] = useState(null);

useEffect(() => {
  const loadingData = async () => {
    try {
      const [
        resHeading,
        resDescr,
        resImages
      ] = await Promise.all([
        axios.get("top_heading_certificate?lang=en"),
        axios.get("certificate_descr?lang=en"),
        axios.get("certificates_images?lang=en")
      ]);

      setCertificatHeading(resHeading.data.results[0]);
      setCertificatDescr(resDescr.data.results[0]);
      setCertificatImages(resImages.data.results[0]);

    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  loadingData();
}, []);


  return (
    <div className="CertificatesPage container">
      <div className="row">
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
