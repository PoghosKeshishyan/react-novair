

export function CertificatesImages({certificatImages}){

    return(
        <div className="certificares_page_certificares_images_container">
        <h2 className="certificares_page_heading">{certificatImages.heading}</h2>
        {
          certificatImages?.images?.map(item => (
            <img src={item.src} alt="Certificat" />
          ))
        }

        </div>
    )
}