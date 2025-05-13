import './Intro.css';

export function Intro({ introData }) {
    return (
        <div className="Intro" style={{ backgroundImage: `url(http://46.182.172.161:8085/${introData.image})` }}>
            <div className="container">
                <img src={`http://46.182.172.161:8085/${introData.title_logo_image}`} alt="logo-img" />
                <p className="text">{introData.descr}</p>
            </div>
        </div>
    )
}
