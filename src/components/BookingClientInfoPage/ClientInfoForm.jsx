import { useState } from "react";
import { RenderRow } from './RenderRow';
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from 'react-phone-input-2'
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import 'react-phone-input-2/lib/style.css'
import './ClientInfoForm.css';

export function ClientInfoForm({ elem, flightSeats, index, onChangePassangerListInput, clientInfoPageLabel, isAnySeatTaken, onChangeFlightSeats, submitFlightSeatTaken }) {
    // const currentSeat = flightSeats.find(elem => elem.is_taken === true) || false;
    countries.registerLocale(enLocale);

    const passanger_types = {
        adult: clientInfoPageLabel.passanger_types.split('/')[0],
        child: clientInfoPageLabel.passanger_types.split('/')[1],
        baby: clientInfoPageLabel.passanger_types.split('/')[2],
    };

    // console.log(elem);

    return (
        <form className='ClientInfoForm'>
            <h2 className='passanger-type'>
                {index + 1}. {passanger_types[elem.passenger_type]}
            </h2>

            {elem.passenger_type !== 'baby' && <div className="box">
                <h2 className="title">{clientInfoPageLabel.order_data_title}</h2>

                <div className="fields">
                    <div className="input-box">
                        <label htmlFor="tel">{clientInfoPageLabel.phone_text_field}</label>
                        <PhoneInput
                            country={'am'}
                            inputProps={{
                                name: 'phone',
                                id: 'tel',
                                required: true,
                                autoFocus: false
                            }}
                            value={elem.phone}
                            containerStyle={{ width: '100%' }}
                            onChange={(phone) => onChangePassangerListInput(index, 'phone', phone)}
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="email">{clientInfoPageLabel.email_text_field}</label>
                        <input type="email" id="email" value={elem.email} onChange={(e) => onChangePassangerListInput(index, 'email', e.target.value)} />
                    </div>
                </div>
            </div>}

            <div className="box">
                <h2 className="title">{clientInfoPageLabel.visitor_details_title}</h2>

                <div className="fields">
                    <div className="input-box small">
                        <label>{clientInfoPageLabel.title_text_field}</label>
                        <select
                            value={elem.title}
                            onChange={(e) => onChangePassangerListInput(index, 'title', e.target.value)}
                        >
                            <option value={clientInfoPageLabel.title_select.split('/')[0]}>
                                {clientInfoPageLabel.title_select.split('/')[0]}
                            </option>

                            <option value={clientInfoPageLabel.title_select.split('/')[1]}>
                                {clientInfoPageLabel.title_select.split('/')[1]}
                            </option>
                        </select>
                    </div>

                    <div className="input-box small">
                        <label htmlFor="full-name">{clientInfoPageLabel.full_name_text_field} <span>*</span></label>
                        <input type="text" required id="full-name" value={elem.full_name} onChange={(e) => onChangePassangerListInput(index, 'full_name', e.target.value)} />
                    </div>

                    <div className="input-box small">
                        <label htmlFor="birth">{clientInfoPageLabel.birth_text_field} <span>*</span></label>
                        <input
                            type="text"
                            placeholder="DD.MM.YYYY"
                            required id="birth"
                            value={elem.date_of_birth}
                            onChange={(e) => onChangePassangerListInput(index, 'date_of_birth', e.target.value)}
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor='citizenship'>{clientInfoPageLabel.citizenship_text_field}</label>
                        <ReactFlagsSelect
                            selected={elem.citizenship_code}
                            onSelect={(code) => {
                                const countryName = countries.getName(code, 'en');
                                onChangePassangerListInput(index, 'citizenship', countryName);
                                onChangePassangerListInput(index, 'citizenship_code', code);
                            }}
                            searchable
                            id='citizenship'
                            placeholder=' '
                            className='citizenship-input'
                        />

                    </div>

                    <div className="input-box">
                        <label htmlFor="passport_serial">{clientInfoPageLabel.passport_text_field}</label>
                        <input type="text" required id="passport_serial" value={elem.passport_serial} onChange={(e) => onChangePassangerListInput(index, 'passport_serial', e.target.value)} />
                    </div>
                </div>
            </div>

            {elem.passenger_type !== 'baby' && <div className="box plane">
                <h2 className="title">{clientInfoPageLabel.seat_title}</h2>

                <div className="airplane-board">
                    <RenderRow prefix={'C'} flightSeats={flightSeats} onChangeFlightSeats={onChangeFlightSeats} />
                    <RenderRow prefix={'B'} flightSeats={flightSeats} onChangeFlightSeats={onChangeFlightSeats} />
                    <RenderRow prefix={'A'} flightSeats={flightSeats} onChangeFlightSeats={onChangeFlightSeats} />
                </div>

                <div className="price-seat">
                    {currentSeat && <p className="price">+ 2000 AMD</p>}

                    <button
                        type="button"
                        onClick={() => currentSeat && submitFlightSeatTaken(currentSeat)}
                        className={`select-seat-btn ${currentSeat ? 'active' : ''}`}
                    >
                        {isAnySeatTaken ? 'Selected' : 'Select'}
                    </button>

                    <p className="seat-number">{currentSeat ? currentSeat.seat_number : '00'}</p>
                </div>
            </div>}
        </form>
    )
}
