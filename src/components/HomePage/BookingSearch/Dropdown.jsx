
export function Dropdown({ showDropdown, from, setFrom }) {
    return (
        <div className={`dropdown ${showDropdown ? 'show' : ''}`}>
            <div className="ticket flex-between">
                <div className="ticket-left-side">
                    <p className="city">Moscow, Russia</p>
                    <p className="airport">Any airport</p>
                </div>

                <div className="right-side">MOW</div>
            </div>

            <div className="ticket flex-between">
                <div className="ticket-left-side">
                    <p className="city">Moscow, Russia</p>
                    <p className="airport">Domodedovo</p>
                </div>

                <div className="right-side">DME</div>
            </div>

            <div className="ticket flex-between">
                <div className="ticket-left-side">
                    <p className="city">Moscow, Russia</p>
                    <p className="airport">Vnukovo</p>
                </div>

                <div className="right-side">VKO</div>
            </div>
        </div>
    )
}
