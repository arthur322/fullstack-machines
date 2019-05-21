import React, { useState } from "react";

import { Form, ModalWrapper } from "./styles";
import { Input, Button } from "../SharedStyled/styled";

const FormModalStatus = props => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <ModalWrapper show={props.show} onClick={() => props.setShow(false)} />
      <Form show={props.show}>
        <h4>
          {props.status.id
            ? `Editar o status de id ${props.status.id}`
            : "Cadastrar uma novo status"}
        </h4>
        <Input type="hidden" name="id" value={props.status.id} />
        <Input
          type="text"
          name="status"
          placeholder="Nome do Status"
          maxLength="25"
          value={props.status.status}
          onChange={props.setStatus}
        />
        <Button
          margin="0 auto"
          type="submit"
          onClick={e => {
            props.handleSubmit(e);
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 3000);
          }}
        >
          {loading ? (
            <i className="fas fa-cog fa-spin fa-lg" />
          ) : props.status.id ? (
            "Editar"
          ) : (
            "Cadastrar"
          )}
        </Button>
      </Form>
    </>
  );
};

export default FormModalStatus;
