import styled from 'styled-components';

export const ButtonSpace = styled.button`
    background-color: ${props => 
        props.color === "danger" ? "#cc3300" : 
        props.color === "warning" ? "#ffcc00" : "#0bade3"};
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 0.4rem 1rem;
    color: #fff;
    transition: all 0.4s ease-in-out;
    cursor: pointer;
    border-radius: 0.3rem;
    font-family: Roboto, arial;
    font-weight: 500;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
`;