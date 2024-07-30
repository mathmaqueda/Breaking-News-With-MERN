import { useState } from "react";
import { InputSpace, TextareaSpace } from "./Input.styled";

export default function Input({ type, placeholder, name, isInput = true, register, value: initialValue }) {
    const [value, setValue] = useState(initialValue);
    let inputProps = {
        type,
        placeholder,
        ...register(name),
        onchange: (e) => setValue(e.target.value)
    };
    if (value) inputProps.value = value;

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