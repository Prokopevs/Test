import React from "react";
import CalendarModel from "./Components/CalendarModel";
import Form from "./Components/Form";
import Table, { IData } from "./Components/Table";

const App = () => {
    const [calendarActive, setCalendarActive] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [data, setData] = React.useState<IData[]>([]);
    return (
        <div className="container">
            <Form
                setCalendarActive={setCalendarActive}
                date={date}
                items={data}
                setData={setData}
            />
            {calendarActive && (
                <CalendarModel
                    setCalendarActive={setCalendarActive}
                    date={date}
                    setDate={setDate}
                />
            )}
            <Table data={data} setData={setData} />
        </div>
    );
};

export default App;
