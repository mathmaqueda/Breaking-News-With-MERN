import { useState, useEffect } from "react";
import { InputSpace, TextareaSpace } from "./Input.styled";

export default function Input({ type, placeholder, name, isInput = true, register, value: initialValue, disabled = false }) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (initialValue !== undefined) {
            setValue(initialValue);
        }
    }, [initialValue]);

    let inputProps = {
        type,
        placeholder,
        ...register(name),
        value,
        disabled,
        onChange: (e) => setValue(e.target.value),
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
