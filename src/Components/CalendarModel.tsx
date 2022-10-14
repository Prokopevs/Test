import { ChangeEvent } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

interface ICalendarModel {
    setCalendarActive: (...arg: boolean[]) => void
    date: Date
    setDate: (value: Date, event: ChangeEvent<HTMLInputElement>) => void
}

const CalendarModel: React.FC<ICalendarModel> = ({
    setCalendarActive,
    date,
    setDate,
}) => {
    return (
        <div className="modalWindow">
            <div className="modalWindow_content">
                <div className="calendar-container">
                    <Calendar onChange={setDate} value={date} />
                </div>
                <button onClick={() => setCalendarActive(false)} className="button">
                    Ok
                </button>
            </div>
        </div>
    )
}

export default CalendarModel
