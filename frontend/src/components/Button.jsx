import { ButtonSpace } from "./Button.styled";

export default function Button({ type, text }) {
    return (
        <ButtonSpace type={type}>{text}</ButtonSpace>
    );
}