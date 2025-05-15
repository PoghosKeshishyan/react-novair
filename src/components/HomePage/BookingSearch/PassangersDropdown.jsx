
export function PassangersDropdown({ showDropdown, passangers_field_list, bookingPostData, handlerPlusBtn, handlerMinusBtn, setShowDropdown }) {
    return (
        <div className={`PassangersDropdown ${showDropdown ? 'show' : ''}`}>

            <div className="box">
                <div className="box-info">
                    <img src="/images/adult.svg" alt="adult-icon" />

                    <div className="info">
                        <p className="passanger-title">{passangers_field_list.adult_title}</p>
                        <p className="passanger-descr">{passangers_field_list.adult_descr}</p>
                    </div>
                </div>

                <div className="controls">
                    <button className={`minus ${bookingPostData.adult_count > 1 && 'active'}`} onClick={() => bookingPostData.adult_count > 1 && handlerMinusBtn('adult_count')}>-</button>
                    <p className="count active">{bookingPostData.adult_count}</p>
                    <button className="plus active" onClick={() => handlerPlusBtn('adult_count')}>+</button>
                </div>
            </div>

            <div className="box">
                <div className="box-info">
                    <img src="/images/child.svg" alt="child-icon" />

                    <div className="info">
                        <p className="passanger-title">{passangers_field_list.child_text}</p>
                        <p className="passanger-descr">{passangers_field_list.child_descr}</p>
                    </div>
                </div>

                <div className="controls">
                    <button className={`minus ${bookingPostData.child_count && 'active'}`} onClick={() => bookingPostData.child_count > 0 && handlerMinusBtn('child_count')}>-</button>
                    <p className={`count ${bookingPostData.child_count && 'active'}`}>{bookingPostData.child_count}</p>
                    <button className="plus active" onClick={() => handlerPlusBtn('child_count')}>+</button>
                </div>
            </div>

            <div className="box">
                <div className="box-info">
                    <img src="/images/baby.svg" alt="baby-icon" />

                    <div className="info">
                        <p className="passanger-title">{passangers_field_list.baby_title}</p>
                        <p className="passanger-descr">{passangers_field_list.baby_descr}</p>
                    </div>
                </div>

                <div className="controls">
                    <button className={`minus ${bookingPostData.baby_count && 'active'}`} onClick={() => bookingPostData.baby_count > 0 && handlerMinusBtn('baby_count')}>-</button>
                    <p className={`count ${bookingPostData.baby_count && 'active'}`}>{bookingPostData.baby_count}</p>
                    <button className="plus active" onClick={() => handlerPlusBtn('baby_count')}>+</button>
                </div>
            </div>

            <div className="btn-box">
                <button onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(prev => !prev);
                }}>
                    {passangers_field_list.btn_text}
                </button>
            </div>

        </div>
    )
}