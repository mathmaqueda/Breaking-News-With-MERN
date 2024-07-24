export default function TextLimit({text, limit}) {
    const textLimited = text.length > limit ? `${text.substring(0, limit).trim()}...` : text;
    return (
        <p>{textLimited}</p>
    );
}