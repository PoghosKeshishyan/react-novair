import './Intro.css';

export default function Intro() {
    return (
        <div className="Intro" style={{ backgroundImage: `url(/images/intro/intro-bg.png)` }}>
            <div className="container">
                <img src="/images/intro/logo.svg" alt="logo-img" />
                <p className="text">New Horizons, Endless Possibilities</p>
            </div>
        </div>
    )
}
