import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container, Button, Flex } from "../../components/SharedStyled/styled";
import TopMenu from "../../components/TopMenu";
import FormModal from "../../components/FormModal";
import MachineTable from "../../components/MachineTable";

const Dashboard = () => {
  const [machines, setMachines] = useState([]);
  const [machine, setMachine] = useState({ id: "", name: "" });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getMachines() {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/machines`
      );
      setMachines(data);
      console.log(data);
    }
    getMachines();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (machine.name.length === 0) {
      alert("Nome inválido!");
    } else {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/machines`,
        machine
      );
      console.log(data);
      console.log(machines);
      setMachines([...machines, data.data]);
      setShowModal(false);
    }
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
        <MachineTable dataList={machines} />
      </Container>
    </>
  );
};

export default Dashboard;
