import styled from 'styled-components';

export const AuthContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    margin: 0 auto;

    form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
    }
`;

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: ${props => props.type === "signin" ? "1rem 0 0 1rem" : "0 1rem 1rem 0"};
    width: 100%;
    height: 350px;
    padding: 2rem;
    gap: 1rem;
    background-color: ${props => props.type === "signin" ? "blue" : "white"};
    color: ${props => props.type === "signin" ? "white" : "blue"};

    h2 {
        font-size: 2rem;
        text-align: center;
        font-weight: 700;
    }
`;