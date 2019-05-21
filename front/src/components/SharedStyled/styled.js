import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 15px 30px;
  @media (max-width: 425px) {
    padding: 15px 10px;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  border: none;
  background: #2c3e50;
  padding: 10px;
  width: 200px;
  margin: ${({ margin }) => (margin ? margin : "")};
  color: white;
  font-size: 14px;
  border-radius: 5px;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "")};
  align-items: ${({ align }) => (align ? align : "")};
  justify-content: ${({ justify }) => (justify ? justify : "")};
  @media (max-width: 425px) {
    flex-direction: column;
    & > * {
      margin: 5px auto;
    }
  }
`;

export const IconButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  border-radius: 5px;
  padding: 5px;
  transition: 0.2s ease;
  &:hover {
    color: white;
    background: ${({ backColor }) => (backColor ? backColor : "#2c3e50")};
  }
`;
