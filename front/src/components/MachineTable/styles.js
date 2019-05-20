import styled from "styled-components";

export const Table = styled.table`
  margin-top: 30px;
  border-collapse: collapse;
  width: 100%;
  min-width: 500px;
  thead {
    background: #2c3e50;
    td {
      color: white;
      font-weight: bold;
    }
  }
  td {
    padding-left: 20px;
    height: 35px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  tbody tr {
    border-bottom: 1px solid #dcdcdc;
  }
`;

export const OverflowWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
`;
