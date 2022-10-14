import React from "react"
import { IData } from "./Table"

interface IAccounts {
    active: (...arg: boolean[]) => void
    items: IData[]
    setValue: any
}

const Accounts: React.FC<IAccounts> = ({ active, items, setValue }) => {
    const accountsArr = items.map((element) => element.accounts)
    const handleClick = (item: string) => {
        active(false)
        setValue("accounts", item)
    }
    return (
        <div className="accounts">
            <ul>
                {accountsArr.map((item, index) => (
                    <li
                        onClick={() => handleClick(item)}
                        className="accounts__text"
                        key={item + index}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Accounts
