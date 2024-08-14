import styled from 'styled-components';

export const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 100%;

  box-shadow: rgba(50, 50, 105, 0.149) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  border-radius: 0.3rem;
  background-color: #fff;
`;
export const CardBody = styled.article`
  display: flex;
  width: 100%;
  height: 100%;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    width: 100%;
  }

  img {
    width: 35%;
    object-fit: cover;
    object-position: center;
    border-radius: 0 0.3 0.3rem 0;
  }
`;

export const CardHeader = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  font-size: ${(props) => props.$top ? "1.5rem" : "0.9rem"};

  h2 {
    margin-bottom: 1rem;
    font-size: ${(props) => (props.$top ? "2.8rem" : "1.1rem")};
    width: 100%;
  }

  span {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1rem;
  }

  i {
    cursor: pointer;
    color: #0bade3;
    font-size: 1.1rem;
    text-decoration: none;
    border: none;
  }
`;

export const CardFooter = styled.article`
    display: flex;
    align-items: center;
    gap: 1rem;

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

    i.edit {
      cursor: pointer;
      text-decoration: none;
      border: none;
      transition: all 0.3s ease-in-out;

      a {
        color: inherit;
        text-decoration: none;
      }
    }

    i.edit:hover {
      color: #0bade3;
    }
`;