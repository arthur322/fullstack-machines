import React, { useState } from "react";

import TopMenu from "../../components/TopMenu";

import { Container, Button, Flex } from "../../components/SharedStyled/styled";
import FormModal from "../../components/FormModal";

const Dashboard = () => {
  const [machine, setMachine] = useState({ id: "", name: "" });
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    machine.name.length === 0 ? alert("Nome inválido!") : setShowModal(false);
    console.log(machine);
  };

  return (
    <>
      <TopMenu />
      <Container>
        <Flex justify="space-between">
          <h2>Máquinas</h2>
          <Button onClick={() => setShowModal(!showModal)}>
            Adicionar máquina
          </Button>
        </Flex>
        <FormModal
          show={showModal}
          setShow={setShowModal}
          machine={machine}
          setMachine={e => setMachine({ ...machine, name: e.target.value })}
          handleSubmit={handleSubmit}
        />
      </Container>
    </>
  );
};

export default Dashboard;
