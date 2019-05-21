import React, { useState } from "react";

import { Form, ModalWrapper } from "./styles";
import { Input, Button } from "../SharedStyled/styled";

const FormModal = props => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <ModalWrapper show={props.show} onClick={() => props.setShow(false)} />
      <Form show={props.show}>
        <h4>
          {props.machine.id
            ? `Editar a máquina de id ${props.machine.id}`
            : "Cadastrar uma nova máquina"}
        </h4>
        <Input type="hidden" name="id" value={props.machine.id} />
        <Input
          type="text"
          name="name"
          placeholder="Nome da máquina"
          maxLength="25"
          value={props.machine.name}
          onChange={props.setMachine}
        />
        <Button
          margin="0 auto"
          type="submit"
          onClick={async e => {
            setLoading(true);
            await props.handleSubmit(e);
            setLoading(false);
          }}
        >
          {loading ? (
            <i className="fas fa-cog fa-spin fa-lg" />
          ) : props.machine.id ? (
            "Editar"
          ) : (
            "Cadastrar"
          )}
        </Button>
      </Form>
    </>
  );
};

export default FormModal;
