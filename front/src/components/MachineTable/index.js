import React from "react";
import moment from "moment";

import { Table, OverflowWrapper } from "./styles";
import { IconButton } from "../../components/SharedStyled/styled";

const MachineTable = props => (
  <OverflowWrapper>
    <Table>
      <thead>
        <tr>
          <td>id</td>
          <td>Nome</td>
          <td>Status Atual</td>
          <td>Criada em</td>
          <td>Ações</td>
        </tr>
      </thead>
      <tbody>
        {props.dataList.length ? (
          props.dataList.map(data => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>
                {data.hasOwnProperty("lastStatus") && data.lastStatus.length
                  ? data.lastStatus[0].status
                  : ""}
              </td>
              <td>{moment(data.createdAt).format("DD/MM/YYYY HH:mm")}</td>
              <td>
                <IconButton onClick={() => props.onEdit(data)}>
                  <i className="fas fa-edit" />
                </IconButton>
                <IconButton
                  backColor="red"
                  onClick={() => props.onDelete(data)}
                >
                  <i className="fas fa-trash-alt" />
                </IconButton>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colspan="5">
              <i className="fas fa-cog fa-spin fa-3x" />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </OverflowWrapper>
);
export default MachineTable;
