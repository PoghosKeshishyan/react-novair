
export function PassangersDropdown({ showDropdown, passangersCount, handlerPlusBtn, handlerMinusBtn, setShowDropdown }) {
    return (
        <div className={`PassangersDropdown ${showDropdown ? 'show' : ''}`}>

            <div className="box">
                <div className="box-info">
                    <img src="/images/adult.svg" alt="adult-icon" />

                    <div className="info">
                        <p className="passanger-title">Adult</p>
                        <p className="passanger-descr">Above 12 years old</p>
                    </div>
                </div>

                <div className="controls">
                <button className={`minus ${passangersCount[0].count > 1 && 'active'}`} onClick={() => handlerMinusBtn(0)}>-</button>
                <p className="count active">{passangersCount[0].count}</p>
                <button className="plus active" onClick={() => handlerPlusBtn(0)}>+</button>
                </div>
            </div>

            <div className="box">
                <div className="box-info">
                    <img src="/images/child.svg" alt="child-icon" />

                    <div className="info">
                        <p className="passanger-title">Child</p>
                        <p className="passanger-descr">From 2 to 12 years old</p>
                    </div>
                </div>

                <div className="controls">
                    <button className={`minus ${passangersCount[1].count && 'active'}`} onClick={() => handlerMinusBtn(1)}>-</button>
                    <p className={`count ${passangersCount[1].count && 'active'}`}>{passangersCount[1].count}</p>
                    <button className="plus active" onClick={() => handlerPlusBtn(1)}>+</button>
                </div>
            </div>

            <div className="box">
                <div className="box-info">
                    <img src="/images/baby.svg" alt="baby-icon" />

                    <div className="info">
                        <p className="passanger-title">Baby</p>
                        <p className="passanger-descr">Below 2 years old</p>
                    </div>
                </div>

                <div className="controls">
                    <button className={`minus ${passangersCount[2].count && 'active'}`} onClick={() => handlerMinusBtn(2)}>-</button>
                    <p className={`count ${passangersCount[2].count && 'active'}`}>{passangersCount[2].count}</p>
                    <button className="plus active" onClick={() => handlerPlusBtn(2)}>+</button>
                </div>
            </div>

            <div className="btn-box">
                <button onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(prev => !prev)
                }}>
                    Done
                </button>
            </div>

        </div>
    )
}