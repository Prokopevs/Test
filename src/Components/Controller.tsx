import { useFormState, useWatch } from "react-hook-form"

interface IController {
    control: any
    register: any
    name: string
    rules: object
    render: any
}

const Controller: React.FC<IController> = ({
    control,
    register,
    name,
    rules,
    render,
}) => {
    const value = useWatch({
        control,
        name,
    })
    const { errors } = useFormState({
        control,
        name,
    })
    const props = register(name, rules)

    return render({
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            props.onChange({
                target: {
                    name,
                    value: e.target.value,
                },
            }),
        onBlur: props.onBlur,
        name: props.name,
        errors,
    })
}

export default Controller
