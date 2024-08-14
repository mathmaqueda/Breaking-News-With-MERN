import styled from "styled-components";

export const AddUserContainer = styled.section`
  width: 60%;
  margin: 6.5rem auto 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 0.3rem;
 
  h2 {
    margin-top: 1rem;
  }

  form {
    min-width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
    gap: 1rem;
  }

  form div {
    min-width: 80%;
    margin: 1rem 0;
  }

  form h2, form div span {
    display: flex;
    justify-content: center;
  }
`;

export const LabeledInputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-size: 1rem;
    margin-bottom: 0.2rem;
  }

  input {
    width: 100%;
    box-sizing: border-box; /* Garante que padding seja incluído na largura total */
    border: 1px solid #ccc;
    border-radius: 0.3rem;
  }
`;

export const ManageUserFormFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
