

export function SeatChoicePrice({choicePrice}){

    return(
        <div className="seat_choice_page_row_box">
        <h2 className="seat_choice_page_heading">
          {choicePrice.heading}
        </h2>

        <p className="seat_choice_page_text">
        {choicePrice.description}
        </p>
      </div>
    )
}