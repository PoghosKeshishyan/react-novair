import { useState } from "react";
import "./WhyChooseUs.css";

export function WhyChooseUs({ whyChooseUsData }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="WhyChooseUs">
            <div className="container">
                <div className="row">
                    <div className="image">
                        <img src={whyChooseUsData.image} alt="girl-img" className="girl-img" />
                        <img src="/images/World_Map.svg" alt="map" className="map-img" />
                    </div>

                    <div className="content">
                        <div className="title">{whyChooseUsData.title}</div>
                        <div className="sub_title">{whyChooseUsData.sub_title}</div>

                        <div className="accordion">
                            {whyChooseUsData.reasons_list.map((item, index) => (
                                <div
                                    key={index}
                                    className={`accordion-item ${activeIndex === index ? "active" : ""}`}
                                >
                                    <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                                        <div className="title">
                                            <span className="number">0{index + 1}</span>
                                            <h2>{item.title}</h2>
                                        </div>

                                        <span className="icon">
                                            {
                                                activeIndex === index ?
                                                    <img src="/images/arrow-up.svg" />
                                                    :
                                                    <img src="/images/arrow-down.svg" />
                                            }
                                        </span>
                                    </div>

                                    <div className="accordion-content" style={{ display: activeIndex === index ? "block" : "none" }}>
                                        <p>{item.descr}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}