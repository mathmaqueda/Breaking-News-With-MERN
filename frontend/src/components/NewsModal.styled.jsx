import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  position: relative;
    .close {
        cursor: pointer;
        position: absolute;
        right: 2rem;
        top: 2rem;
    }
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80%;
  overflow-y: auto;

  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 1.5rem 0;
  }
`;

export const NewsBody = styled.div`
    h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    img {
        width: auto;            
        max-width: 80%;         
        height: auto;           
        border-radius: 8px;
        margin-bottom: 1rem;
        display: block;       
        margin-left: auto;
        margin-right: auto;   
    }

    p {
        font-size: 1rem;
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }
`;

export const NewsStatus = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    section {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        cursor: pointer;
    }

    .like:hover {
        i {
           color: red;
        }
    }

    .comment:hover {
        i {
           color: #0bade3;
        }
    }

    span {
    font-size: 1rem;
    }
`;

export const Comments = styled.div`
    h3 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 0.5rem;
        margin-bottom: 1rem;

        p strong {
            font-size: 1rem;
            margin-bottom: 0.5rem;
        }

        p {
            font-size: 0.9rem;
            width: 100%;
        }
    }

    form {
        padding-top: 1rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        input {
            width: 100%;
        }

        button {
            padding: 0.6rem 1rem;
        }
    }
`;