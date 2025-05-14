import './Intro.css';

export function Intro({ introData }) {
    return (
        <div className="Intro" style={{ backgroundImage: `url(${introData.image})` }}>
            <div className="container">
                <img src={`${introData.title_logo_image}`} alt="logo-img" />
                <p className="text">{introData.descr}</p>
            </div>
        </div>
    )
}
