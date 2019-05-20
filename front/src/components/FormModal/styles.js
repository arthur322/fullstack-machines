import styled, { css } from "styled-components";

const changeVisibility = props => css`
  visibility: ${props => (props.show ? "visible" : "hidden")};
  opacity: ${props => (props.show ? "1" : "0")};
  transition: 0.3s ease;
`;

export const ModalWrapper = styled.div`
  ${changeVisibility};
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  background: #00000099;
  z-index: 3;
`;

export const Form = styled.form`
  ${changeVisibility};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 10px;
  width: 60%;
  background: #34495e;
  border-radius: 5px;
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translate(-50%);
  z-index: 4;
  & > * {
    margin-top: 10px;
  }
  h4 {
    text-align: center;
    color: white;
  }
  @media (max-width: 425px) {
    width: 98%;
    padding: 10px 5px;
  }
`;
