import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { calendar, notebook } from "../pictures";
import Accounts from "./Accounts";
import { IData } from "./Table";
import { Dispatch, SetStateAction } from "react";
import { postData } from "../fetch/postData";

interface IForm {
    setCalendarActive: (...arg: boolean[]) => void;
    date: Date;
    items: IData[];
    setData: Dispatch<SetStateAction<IData[]>>;
}

const Form: React.FC<IForm> = ({ setCalendarActive, date, items, setData }) => {
    const [AccountsActive, setAccountsActive] = React.useState(false);
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [accountNumber, setAccountNumber] = React.useState<string>("");
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<IData>({ mode: "onBlur" });

    const onSubmit: SubmitHandler<IData> = (data) => {
        if (!data.number) {
            data.number = items.length + 1;
        }
        data.number = Number(data.number);
        data.accounts = accountNumber;
        const newData = [...items, data];
        postData(data, setData, newData, setButtonDisabled);
        setAccountNumber("");
        reset();
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form">
                    <div className="form__inner">
                        <div className="form__inner_first">
                            <p className="form__inner_text">Номер:</p>
                        </div>

                        <div className="form__inner_second">
                            <input className="form__input" {...register("number")}></input>
                            <p className="form__inner_text">Дата:</p>
                            <input
                                className={
                                    errors?.date
                                        ? "form__input error required"
                                        : "form__input required"
                                }
                                value={date.toLocaleDateString("en-GB")}
                                {...register("date", { required: true })}
                            ></input>
                            <img
                                className="form__inner_photo"
                                onClick={() => setCalendarActive(true)}
                                src={String(calendar)}
                            ></img>
                        </div>
                    </div>

                    <div className="form__inner">
                        <div className="form__inner_first">
                            <p className="form__inner_text">Счёт отправителя:</p>
                        </div>

                        <div className="form__inner_second">
                            <input
                                className={
                                    errors?.accounts
                                        ? "form__input error required maxWidth"
                                        : "form__input required maxWidth"
                                }
                                {...register("accounts", { required: true })}
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                            ></input>
                            <img
                                className="form__inner_notebook"
                                onClick={() => setAccountsActive(!AccountsActive)}
                                src={String(notebook)}
                            ></img>
                            {AccountsActive && (
                                <Accounts
                                    setAccountNumber={setAccountNumber}
                                    active={setAccountsActive}
                                    items={items}
                                />
                            )}
                        </div>
                    </div>

                    <div className="form__inner">
                        <div className="form__inner_first">
                            <p className="form__inner_text">Корреспондент:</p>
                        </div>

                        <div className="form__inner_second">
                            <input
                                className="form__input maxWidth"
                                {...register("correspondent")}
                            ></input>
                        </div>
                    </div>

                    <div className="form__inner">
                        <div className="form__inner_first">
                            <p className="form__inner_text">Наим.дохода:</p>
                        </div>

                        <div className="form__inner_second">
                            <input className="form__input maxWidth" {...register("income")}></input>
                        </div>
                    </div>
                </div>

                <div className="form__submit">
                    <button type="submit" disabled={buttonDisabled} className="button margin">
                        Подтвердить
                    </button>
                    {buttonDisabled && <p className="form__submit_text">Отправляем на сервер...</p>}
                </div>
            </form>
        </>
    );
};

export default Form;
