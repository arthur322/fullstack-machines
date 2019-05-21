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
      &:last-child {
        padding: 0;
        text-align: center;
      }
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
    @media (min-width: 768px) {
      td:last-child {
        padding-left: 0;
        text-align: center;
        button:not(:last-child) {
          margin-right: 5px;
        }
      }
    }
  }
`;

export const OverflowWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  i.fa-cog {
    margin: 0 auto;
  }
`;
