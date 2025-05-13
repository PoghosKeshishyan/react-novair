import { useState } from "react";
import "./Faq.css";

export function Faq({ faqData }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="Faq">
            <div className="container">
                <h2 className="title">{faqData.title}</h2>

                <div className="faq-list">
                    {faqData.question_list.map((faq, index) => (
                        <div
                            key={index}
                            onClick={() => toggleFAQ(index)}
                            className={`faq-item ${openIndex === index ? "open" : ""}`}
                        >
                            <div className="faq-header flex-between">
                                <p className="faq-question">{faq.question}</p>
                                {
                                    openIndex === index ?
                                        <img src="/images/arrow-up.svg" />
                                        :
                                        <img src="/images/arrow-down.svg" />
                                }
                            </div>

                            {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}