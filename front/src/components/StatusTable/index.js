import React from "react";
import moment from "moment";

import { Table, OverflowWrapper } from "./styles";
import { IconButton } from "../../components/SharedStyled/styled";

const StatusTable = props => (
  <OverflowWrapper>
    <Table>
      <thead>
        <tr>
          <td>id</td>
          <td>Status</td>
          <td>Código</td>
          <td>Criada em</td>
          <td>Ações</td>
        </tr>
      </thead>
      <tbody>
        {props.dataList.length ? (
          props.dataList.map(data => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.status}</td>
              <td>{data.code}</td>
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
            <td colSpan="5">
              <i className="fas fa-cog fa-spin fa-3x" />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </OverflowWrapper>
);
export default StatusTable;
