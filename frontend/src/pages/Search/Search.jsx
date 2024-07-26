import {useParams} from 'react';

export default function Search() {
    const {title} = useParams();

    return (
        <h1>{title}</h1>
    );
}