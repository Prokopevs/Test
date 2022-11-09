import React from "react"

type ICommonInput = {
    register: any
    ruName: string
    enName: string
}

const CommonInput: React.FC<ICommonInput> = ({ register, ruName, enName }) => {
    return (
        <div className="form__inner">
            <div className="form__inner_first">
                <p className="form__inner_text">{ruName}:</p>
            </div>
            <div className="form__inner_second">
                <input className="form__input maxWidth" {...register(enName)}></input>
            </div>
        </div>
    )
}

export default CommonInput
