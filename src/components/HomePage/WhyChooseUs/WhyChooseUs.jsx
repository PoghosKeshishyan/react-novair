import { useState } from "react";
import "./WhyChooseUs.css";

export function WhyChooseUs() {
    const [activeIndex, setActiveIndex] = useState(0);

    const reasons_list = [
        {
            title: "Convenience and Efficiency",
            content: "Choose us because we provide an easy and fast flight booking experience. With an intuitive interface, you can finish the flight booking process in minutes."
        },
        {
            title: "Competitive Prices",
            content: "We offer the best prices on the market, ensuring affordability without compromising quality."
        },
        {
            title: "Customer Support",
            content: "Our 24/7 customer support is always ready to assist you with any inquiries."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="WhyChooseUs">
            <div className="container">
                <div className="row">
                    <div className="image">
                        <img src="/images/whyChooseUs/girl.png" alt="girl-img" className="girl-img" />
                        <img src="/images/World_Map.svg" alt="map" className="map-img" />
                    </div>

                    <div className="content">
                        <div className="title">Why Choose Us?</div>
                        <div className="sub_title">98% of Clients Satisfied with our Service</div>

                        <div className="accordion">
                            {reasons_list.map((item, index) => (
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
                                        <p>{item.content}</p>
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
