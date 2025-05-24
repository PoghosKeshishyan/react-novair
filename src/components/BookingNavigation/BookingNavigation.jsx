import React from 'react';
import './BookingNavigation.css';

export function BookingNavigation({ bookingNavigation, active_section }) {
    return (
        <div className='BookingNavigation'>
            {
                bookingNavigation.map((elem, index) => (
                    <React.Fragment key={index}>
                        {index ? (
                            <div className={`line ${active_section+1 >= elem.section_number ? 'active' : ''}`}></div>
                        ):''}

                        <div className="field">
                            <img
                                alt="check-img"
                                src={active_section >= elem.section_number
                                    ? '/images/check-icon-active.svg'
                                    : '/images/check-icon.svg'}
                            />

                            <p>{elem.title}</p>
                        </div>
                    </React.Fragment>
                ))
            }
        </div>
    );
};