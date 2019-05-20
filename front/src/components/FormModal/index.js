import React from "react";

import { Form, ModalWrapper } from "./styles";
import { Input, Button } from "../SharedStyled/styled";

const FormModal = props => (
  <>
    <ModalWrapper show={props.show} onClick={() => props.setShow(false)} />
    <Form show={props.show}>
      <h4>Cadastrar uma nova máquina</h4>
      <Input type="hidden" name="id" value={props.machine.id} />
      <Input
        type="text"
        name="name"
        placeholder="Nome da máquina"
        maxLength="25"
        value={props.machine.name}
        onChange={props.setMachine}
      />
      <Button margin="0 auto" type="submit" onClick={props.handleSubmit}>
        Cadastrar
      </Button>
    </Form>
  </>
);

export default FormModal;
