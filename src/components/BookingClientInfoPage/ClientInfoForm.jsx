import { useEffect, useState } from "react";
import { RenderRow } from './RenderRow';
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from 'react-phone-input-2'
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import Flatpickr from "react-flatpickr";
import { Armenian } from "flatpickr/dist/l10n/hy.js";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import { English } from "flatpickr/dist/l10n/default.js";
import "flatpickr/dist/themes/material_blue.css";
import 'react-phone-input-2/lib/style.css'
import './ClientInfoForm.css';

export function ClientInfoForm({
    elem,
    flightSeats,
    index,
    onChangePassangerListInput,
    submitFlightSeatTakenDeparture,
    submitFlightSeatTakenReturn,
    validationErrors,
    currentLang,
    clientInfoPageLabel,
    bookingPostData,
    holdSeats,
}) {
    countries.registerLocale(enLocale);

    const [selectedDirection, setSelectedDirection] = useState('first');
    const [firstActionSelectBtn, setFirstActionSelectBtn] = useState(false);
    const [secondActionSelectBtn, setSecondActionSelectBtn] = useState(false);

    const [selectedSeat, setSelectedSeat] = useState({
        departureSeats: '',
        returnSeats: bookingPostData.return_date ? '' : null
    });

    useEffect(() => {
        if (selectedSeat.departureSeats) {
            setFirstActionSelectBtn(true);
        }

        if (selectedSeat.returnSeats) {
            setSecondActionSelectBtn(true);
        }
    }, [selectedSeat]);

    const passanger_types = {
        adult: clientInfoPageLabel.passanger_types.split('/')[0],
        child: clientInfoPageLabel.passanger_types.split('/')[1],
        baby: clientInfoPageLabel.passanger_types.split('/')[2],
    };

    const handleDirectionChange = (direction) => {
        setSelectedDirection(direction);
    };

    const getLocale = () => {
        switch (currentLang) {
            case 'am':
                return Armenian;
            case 'ru':
                return Russian;
            case 'en':
            default:
                return English;
        }
    };

    return (
        <form className='ClientInfoForm'>
            <h2 className='passanger-type'>
                {index + 1}. {passanger_types[elem.passenger_type]}
                {
                    elem.passenger_type !== 'baby' && <p>{clientInfoPageLabel.baggage_airport_info}</p>
                }
            </h2>

            {(elem.passenger_type !== 'baby' && elem.passenger_type !== 'child') &&
                <div className="box">
                    <h2 className="title">{clientInfoPageLabel.order_data_title}</h2>

                    <div className="fields">
                        <div className={`input-box ${validationErrors[index]?.phone ? 'error' : ''}`}>
                            <label htmlFor="tel">{clientInfoPageLabel.phone_text_field} <span>*</span></label>
                            <PhoneInput
                                inputProps={{
                                    name: 'phone',
                                    id: 'tel',
                                    required: true,
                                    autoFocus: false
                                }}
                                value={elem.phone}
                                containerStyle={{ width: '100%' }}
                                onChange={(phone) => onChangePassangerListInput(index, 'phone', phone)}
                                placeholder="+374 60 757-576"
                            />
                        </div>

                        <div className={`input-box ${validationErrors[index]?.email ? 'error' : ''}`}>
                            <label htmlFor="email">{clientInfoPageLabel.email_text_field} <span>*</span></label>
                            <input type="email" id="email" value={elem.email} onChange={(e) => onChangePassangerListInput(index, 'email', e.target.value)} />
                        </div>
                    </div>
                </div>
            }

            <div className="box visitor_details">
                <h2 className="title_plane">{clientInfoPageLabel.visitor_details_title}</h2>

                <div className="fields">
                    <div className={`input-box small ${validationErrors[index]?.title ? 'error' : ''}`}>
                        <label>{clientInfoPageLabel.title_text_field} <span>*</span></label>
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

                    <div className={`input-box small ${validationErrors[index]?.full_name ? 'error' : ''}`}>
                        <label htmlFor="full-name">{clientInfoPageLabel.full_name_text_field} <span>*</span></label>
                        <input type="text" required id="full-name" value={elem.full_name} onChange={(e) => onChangePassangerListInput(index, 'full_name', e.target.value)} />
                    </div>

                    <div className={`input-box small ${validationErrors[index]?.date_of_birth ? 'error' : ''}`}>
                        <label htmlFor="birth">{clientInfoPageLabel.birth_text_field} <span>*</span></label>
                        <Flatpickr
                            id="birth"
                            options={{
                                dateFormat: "d.m.Y",  // DD.MM.YYYY ձևաչափ
                                allowInput: true,
                                locale: getLocale() || English
                            }}
                            value={elem.date_of_birth ? new Date(elem.date_of_birth.split('.').reverse().join('-')) : null}
                            placeholder="dd.mm.yyyy"
                            onChange={([date]) => {
                                const formattedDate = date
                                    ? date.toLocaleDateString('en-GB').replace(/\//g, '.')
                                    : '';
                                onChangePassangerListInput(index, 'date_of_birth', formattedDate);
                            }}
                            className="flatpickr-input"
                        />
                    </div>

                    <div className="input-box small">
                        <label htmlFor='citizenship'>{clientInfoPageLabel.citizenship_text_field} <span>*</span></label>
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

                    <div className={`input-box small ${validationErrors[index]?.passport_serial ? 'error' : ''}`}>
                        <label htmlFor="passport_serial">{clientInfoPageLabel.passport_text_field} <span>*</span></label>
                        <input type="text" required id="passport_serial" value={elem.passport_serial} onChange={(e) => onChangePassangerListInput(index, 'passport_serial', e.target.value)} />
                    </div>

                    <div className={`input-box small ${validationErrors[index]?.passport_validity_period ? 'error' : ''}`}>
                        <label htmlFor="passport_validity_period">{clientInfoPageLabel.passport_validity_period_field} <span>*</span></label>

                        <Flatpickr
                            id="passport_validity_period"
                            options={{
                                dateFormat: "d.m.Y",  // DD.MM.YYYY ձևաչափ
                                allowInput: true,
                                locale: getLocale() || English
                            }}
                            value={elem.passport_validity_period ? new Date(elem.passport_validity_period.split('.').reverse().join('-')) : null}
                            placeholder="dd.mm.yyyy"
                            onChange={([date]) => {
                                const formattedDate = date
                                    ? date.toLocaleDateString('en-GB').replace(/\//g, '.')
                                    : '';
                                onChangePassangerListInput(index, 'passport_validity_period', formattedDate);
                            }}
                            className="flatpickr-input"
                        />
                    </div>
                </div>
            </div>

            {
                elem.passenger_type !== 'baby' && <div
                    className={`box plane ${!bookingPostData.return_date ? 'only-departure' : ''}`}
                    style={{ height: bookingPostData.return_date ? '555px' : '508px' }}
                >
                    <h2 className="title">{clientInfoPageLabel.seat_title}</h2>

                    <div className="airplane-board">
                        {flightSeats && <RenderRow prefix={'C'} holdSeats={holdSeats} setSelectedSeat={setSelectedSeat} selectedSeat={selectedSeat} flightSeats={flightSeats} direction={selectedDirection === 'first' ? 'departureSeats' : 'returnSeats'} />}
                        {flightSeats && <RenderRow prefix={'B'} holdSeats={holdSeats} setSelectedSeat={setSelectedSeat} selectedSeat={selectedSeat} flightSeats={flightSeats} direction={selectedDirection === 'first' ? 'departureSeats' : 'returnSeats'} />}
                        {flightSeats && <RenderRow prefix={'A'} holdSeats={holdSeats} setSelectedSeat={setSelectedSeat} selectedSeat={selectedSeat} flightSeats={flightSeats} direction={selectedDirection === 'first' ? 'departureSeats' : 'returnSeats'} />}
                    </div>

                    <div className="price-seat">
                        {selectedDirection === 'first' && selectedSeat.departureSeats && (
                            <p className="price">+ 2000 AMD</p>
                        )}

                        {selectedDirection === 'first' && (
                            <>
                                <button
                                    type="button"
                                    className={`select-seat-btn ${firstActionSelectBtn ? 'active' : ''}`}
                                    onClick={() => submitFlightSeatTakenDeparture(selectedSeat, elem.ticket_id)}
                                >

                                    {
                                        elem.departure_seat_id
                                            ? clientInfoPageLabel.selected_btn_text
                                            : clientInfoPageLabel.select_btn_text
                                    }

                                </button>

                                <p className="seat-number">{selectedSeat.departureSeats.seat_number || '00'}</p>
                            </>
                        )}

                        {selectedDirection === 'second' && selectedSeat.returnSeats && (
                            <p className="price">+ 2000 AMD</p>
                        )}

                        {selectedDirection === 'second' && (
                            <>
                                <button
                                    type="button"
                                    className={`select-seat-btn ${secondActionSelectBtn ? 'active' : ''}`}
                                    onClick={() => submitFlightSeatTakenReturn(selectedSeat, elem.return_ticket_id)}
                                >

                                    {
                                        elem.return_seat_id
                                            ? clientInfoPageLabel.selected_btn_text
                                            : clientInfoPageLabel.select_btn_text
                                    }

                                </button>

                                <p className="seat-number">{selectedSeat.returnSeats.seat_number || '00'}</p>
                            </>
                        )}

                    </div>

                    {bookingPostData.return_date && <div className="directions flex-between">
                        <div
                            className={`dir flex-center ${selectedDirection === 'first' ? 'active' : ''}`}
                            onClick={() => handleDirectionChange('first')}
                        >
                            <img src="/images/plane-flight.svg" alt="plane-flight" />
                            <p>{bookingPostData.from_here} - {bookingPostData.to_there}</p>
                        </div>

                        <div
                            className={`dir flex-center ${selectedDirection === 'second' ? 'active' : ''}`}
                            onClick={() => handleDirectionChange('second')}
                        >
                            <img src="/images/plane-arrive.svg" alt="plane-arrive" />
                            <p>{bookingPostData.to_there} - {bookingPostData.from_here}</p>
                        </div>
                    </div>}
                </div>
            }
        </form>
    )
}
