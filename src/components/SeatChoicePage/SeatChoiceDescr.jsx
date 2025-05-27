

export function SeatChoiceDescr({choiceDescr}){

    return(
        <div className="seat_choice_page_row_box">
          <h2 className="seat_choice_page_heading">{choiceDescr.heading}</h2>

          <p className="seat_choice_page_text">{choiceDescr.description}</p>
        </div>
    )
}