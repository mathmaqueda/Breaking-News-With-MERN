import { InputSpace, TextareaSpace } from "./Input.styled";

export default function Input({ type, setValue, placeholder, name, isInput = true, register, disabled = false }) {
    let inputProps = {
        type,
        placeholder,
        ...register(name),
        disabled,
        onInput: (event) => setValue(event.target.value)
    };

    return (
        <>
            {isInput ? (
                <InputSpace {...inputProps} />
            ) : (
                <TextareaSpace {...inputProps} />
            )}
        </>
    );
}
