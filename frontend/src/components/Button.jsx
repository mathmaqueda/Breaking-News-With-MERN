import { ButtonSpace } from "./Button.styled";

export default function Button({ type, text, onClick, color }) {
    return (
        <ButtonSpace onClick={onClick} color={color} type={type}>{text}</ButtonSpace>
    );
}