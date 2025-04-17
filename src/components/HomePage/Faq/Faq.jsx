import { useState } from "react";
import "./Faq.css";

const faqs = [
    {
        question: "How can I change or cancel my booking?",
        answer:
            "Changes and cancellations depend on your fare type. Please check the fare conditions in your account or contact our support team for assistance.",
    },
    {
        question: "What are NovAir's baggage policies?",
        answer: "NovAir allows one carry-on bag and one personal item for free.",
    },
    {
        question: "Can I travel with pets?",
        answer:
            "Yes, small pets are allowed in the cabin, but larger pets must be checked in as cargo.",
    },
    {
        question: "How do I check in for my flight?",
        answer:
            "You can check in online 24 hours before departure or at the airport kiosk.",
    },
    {
        question: "What should I do if my flight is delayed or canceled?",
        answer:
            "If your flight is delayed or canceled, contact our support team for rebooking options.",
    },
];

export function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="Faq">
            <div className="container">
                <h2 className="title">FAQ</h2>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
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