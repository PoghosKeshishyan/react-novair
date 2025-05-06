import React from 'react';
import './BookingNavigation.css';

export function BookingNavigation({ active_section }) {
    const sections = [
        { id: 1, label: 'Choose booking', section_number: 1 },
        { id: 2, label: 'Enter info', section_number: 2 },
        { id: 3, label: 'Payment', section_number: 3 },
    ];

    return (
        <div className='BookingNavigation'>
            {
                sections.map((elem, index) => (
                    <React.Fragment key={index}>
                        {index ? (
                            <div className={`line ${active_section+1 >= elem.section_number ? 'active' : ''}`}></div>
                        ):''}

                        <div className="field" key={elem.id}>
                            <img
                                alt="check-img"
                                src={active_section >= elem.section_number
                                    ? '/images/check-icon-active.svg'
                                    : '/images/check-icon.svg'}
                            />

                            <p>{elem.label}</p>
                        </div>
                    </React.Fragment>
                ))
            }
        </div>
    );
};