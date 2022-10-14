import React from "react"

const ControllerInput = (props: any) => {
    const [value, setValue] = React.useState(props.value || "")

    React.useEffect(() => {
        setValue(props.value || "")
    }, [props.value])

    return (
        <input
            className={
                props.errors?.accounts
                    ? "form__input error required maxWidth"
                    : "form__input required maxWidth"
            }
            name={props.name}
            onChange={(e) => {
                setValue(e.target.value)
                props.onChange && props.onChange(e)
            }}
            value={value}
        />
    )
}

export default ControllerInput
