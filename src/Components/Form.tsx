import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { calendar, notebook } from "../pictures"
import Accounts from "./Accounts"
import { IData } from "./Table"
import { Dispatch, SetStateAction } from "react"
import { postData } from "../fetch/postData"
import ControllerInput from "./ControllerInput"
import Controller from "./Controller"
import CommonInput from "./CommonInput"

interface IForm {
    setCalendarActive: (...arg: boolean[]) => void
    date: Date
    items: IData[]
    setData: Dispatch<SetStateAction<IData[]>>
}

const Form: React.FC<IForm> = ({ setCalendarActive, date, items, setData }) => {
    const [AccountsActive, setAccountsActive] = React.useState(false)
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const {
        register,
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<IData>({ mode: "onBlur" })

    const onSubmit: SubmitHandler<IData> = (data) => {
        if (!data.number) {
            data.number = items.length + 1
        }
        data.number = Number(data.number)
        const newData = [...items, data]
        postData(data, setData, newData, setButtonDisabled)
        reset()
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form">
                    <div className="form__inner">
                        <div className="form__inner_first">
                            <p className="form__inner_text">Номер:</p>
                        </div>

                        <div className="form__inner_second">
                            <input
                                className="form__input"
                                {...register("number")}
                            ></input>
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
                            <Controller
                                {...{
                                    control,
                                    register,
                                    name: "accounts",
                                    rules: {
                                        required: true,
                                    },
                                    render: (props: any) => (
                                        <ControllerInput {...props} />
                                    ),
                                }}
                            />
                            <img
                                className="form__inner_notebook"
                                onClick={() => setAccountsActive(!AccountsActive)}
                                src={String(notebook)}
                            ></img>
                            {AccountsActive && (
                                <Accounts
                                    active={setAccountsActive}
                                    items={items}
                                    setValue={setValue}
                                />
                            )}
                        </div>
                    </div>

                    <CommonInput
                        register={register}
                        ruName={"Корреспондент"}
                        enName={"correspondent"}
                    />
                    <CommonInput
                        register={register}
                        ruName={"Наим.дохода"}
                        enName={"income"}
                    />
                </div>

                <div className="form__submit">
                    <button
                        type="submit"
                        disabled={buttonDisabled}
                        className="button margin"
                    >
                        Подтвердить
                    </button>
                    {buttonDisabled && (
                        <p className="form__submit_text">Отправляем на сервер...</p>
                    )}
                </div>
            </form>
        </>
    )
}

export default Form
