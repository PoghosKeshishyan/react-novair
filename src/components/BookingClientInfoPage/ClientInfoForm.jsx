import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from 'react-phone-input-2'
import { RenderRow } from './RenderRow';
import 'react-phone-input-2/lib/style.css'
import './ClientInfoForm.css';

export function ClientInfoForm({ flightSeats, isAnySeatTaken, onChangeFlightSeats, submitFlightSeatTaken }) {
    const currentSeat = flightSeats.find(elem => elem.is_taken === true) || false;
    const [selected, setSelected] = useState("");

    return (
        <form className='ClientInfoForm'>
            <div className="box">
                <h2 className="title">Order data</h2>

                <div className="fields">
                    <div className="input-box">
                        <label htmlFor="tel">Phone number</label>
                        <PhoneInput
                            country={'am'}
                            inputProps={{
                                name: 'phone',
                                id: 'tel',
                                required: true,
                                autoFocus: false
                            }}
                            containerStyle={{ width: '100%' }}
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" />
                    </div>
                </div>
            </div>

            <div className="box">
                <h2 className="title">Visitor details</h2>

                <div className="fields">
                    <div className="input-box small">
                        <label>Title</label>
                        <select>
                            <option value="Mrs">Mrs</option>
                            <option value="Ms">Ms</option>
                        </select>
                    </div>

                    <div className="input-box small">
                        <label htmlFor="full-name">Full name <span>*</span></label>
                        <input type="text" required id="full-name" />
                    </div>

                    <div className="input-box small">
                        <label htmlFor="birth">Date of birth <span>*</span></label>
                        <input type="date-time" required id="birth" />
                    </div>

                    <div className="input-box">
                        <label htmlFor='citizenship'>Citizenship</label>
                        <ReactFlagsSelect
                            selected={selected}
                            onSelect={(code) => setSelected(code)}
                            searchable
                            id='citizenship'
                            placeholder=' '
                            className='citizenship-input'
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="passport_serial">Passport series and number</label>
                        <input type="text" required id="passport_serial" />
                    </div>
                </div>
            </div>

            <div className="box">
                <h2 className="title">Select seat</h2>

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
            </div>
        </form>
    )
}
