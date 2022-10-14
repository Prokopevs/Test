import React from "react";
import { IData } from "./Table";

interface IAccounts {
    setAccountNumber: (...arg: string[]) => void;
    active: (...arg: boolean[]) => void;
    items: IData[];
}

const Accounts: React.FC<IAccounts> = ({ setAccountNumber, active, items }) => {
    const accountsArr = items.map((element) => element.accounts);
    const handleClick = (item: string) => {
        setAccountNumber(item);
        active(false);
    };
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
    );
};

export default Accounts;
