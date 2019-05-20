import React from "react";
import moment from "moment";

import { Table, OverflowWrapper } from "./styles";

const MachineTable = props => (
  <OverflowWrapper>
    <Table>
      <thead>
        <tr>
          <td>id</td>
          <td>Nome</td>
          <td>Status Atual</td>
          <td>Criada em</td>
        </tr>
      </thead>
      <tbody>
        {props.dataList.map(data => (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>
              {data.hasOwnProperty("lastStatus") && data.lastStatus.length
                ? data.lastStatus[0].status
                : ""}
            </td>
            <td>{moment(data.createdAt).format("DD/MM/YYYY HH:mm")}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </OverflowWrapper>
);
export default MachineTable;
