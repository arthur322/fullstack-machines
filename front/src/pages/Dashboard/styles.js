import styled from "styled-components";

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
  @media (max-width: 425px) {
    flex-wrap: nowrap;
    flex-direction: column;
  }
`;

export const Card = styled.div`
  border-radius: 5px;
  border: 1px solid #2c3e50;
  padding: 16px 10px;
  margin: 10px 5px;
  animation: blinker 1s linear;

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }

  p {
    margin-top: 10px;
  }

  @media (max-width: 425px) {
    margin: 10px 0;
  }
`;

export const Select = styled.select`
  background: white;
  border-radius: 5px;
  padding: 0 5px;
`;
