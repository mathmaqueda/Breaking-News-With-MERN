import styled from "styled-components";

export const ContainerResults = styled.section`
    padding-top: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 50%;
    }
`;


export const SearchNews = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin: 1rem auto;
    width: 85%;
`;

export const TextResults = styled.div`
    padding: 2rem;
    background-color: #fff;
    width: 80%;
    border-radius: 0.3rem;
    box-shadow: 0 2px 5px 0 rgba(50, 50, 105, 0.15), 0 1px 1px 0 rgba(0, 0, 0, 0.05);

    span {
        font-size: 1rem;
    }
`;