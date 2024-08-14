import styled from "styled-components";

export const ProfileContainer = styled.section`
  margin-top: 6rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileHeader = styled.header`
  width: 80%;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  border-radius: 0.3rem;
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  background-color: #fff;
  z-index: 0;
`;

export const ProfileIconEdit = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #ffffff;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #0bade3;

    svg {
      color: #fff;
    }
  }

  svg {
    color: #0bade3;
    font-size: 1.5rem;
  }
`;

export const ProfileBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
  width: 100%;
  height: 55%;
  z-index: -1;
  border-radius: 0.3rem 0.3rem 0 0;
`;

export const ProfileUser = styled.div`
  padding: 2rem;
`;

export const ProfileAvatar = styled.img`
  border-radius: 50%;
  width: 10rem;
  border: solid 5px #fff;
  object-fit: cover;
  object-position: center;
`;

export const ProfileActions = styled.div`
  margin: 2rem;
  label {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    color: #0bade3;
    font-size: 1rem;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  :hover {
    color: #0a86af;
  }
  
  &:hover {
    svg {
      color: #0a86af;
      font-size: 2.1rem;
    }
  }
`;

export const ProfileIconAdd = styled.div`
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer !important;
  transition: all 0.3s ease-in-out;

  svg {
    color: #0bade3;
    font-size: 2rem;
  }
`;

export const ProfilePosts = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  margin: 1rem auto;
  width: 80%;

  h3 {
    grid-column: 1 / -1;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #023344;
    margin-top: 1rem;
  }
`;