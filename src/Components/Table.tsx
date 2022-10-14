import React from "react"
import { Dispatch, SetStateAction } from "react"
import { getData } from "../fetch/getData"

export interface IData {
    number: number
    date: string
    accounts: string
    correspondent: string
    income: string
}

type ITable = {
    data: IData[]
    setData: Dispatch<SetStateAction<IData[]>>
}

const Table: React.FC<ITable> = ({ data, setData }) => {
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        getData(setData, setLoading)
    }, [])

    return loading ? (
        <div className="loading">Идет загрузка...</div>
    ) : (
        <table>
            <thead className="thead">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Дата</th>
                    <th scope="col">Счёт отправителя</th>
                    <th scope="col">Корреспондент</th>
                    <th scope="col">Наим.дохода</th>
                </tr>
            </thead>
            <tbody className="tbody">
                {data.map((element, index) => (
                    <tr key={element.number + index}>
                        <td scope="row">{element.number}</td>
                        <td>{element.date}</td>
                        <td>{element.accounts}</td>
                        <td>{element.correspondent}</td>
                        <td>{element.income}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
