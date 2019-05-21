import React, { useState, useEffect } from "react";

import {
  fetchGetAll,
  fetchPost,
  fetchPut,
  fetchDelete
} from "../../services/machines";

import { Container, Button, Flex } from "../../components/SharedStyled/styled";
import TopMenu from "../../components/TopMenu";
import FormModal from "../../components/FormModal";
import MachineTable from "../../components/MachineTable";

const Machines = () => {
  const [machines, setMachines] = useState([]);
  const [machine, setMachine] = useState({ id: "", name: "" });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getMachines() {
      const data = await fetchGetAll();
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
      if (!machine.id) {
        const data = await fetchPost(machine);
        setMachines([...machines, data.data]);
        setMachine({ id: "", name: "" });
      } else {
        await fetchPut(machine);
        const allData = await fetchGetAll();
        setMachines(allData);
        setMachine({ id: "", name: "" });
      }
      setShowModal(false);
    }
  };

  const handleNew = () => {
    setMachine({ id: "", name: "" });
    setShowModal(true);
  };

  const handleEdit = machine => {
    setMachine(machine);
    setShowModal(true);
  };

  const handleDelete = async machine => {
    const resp = window.confirm(
      `Deseja realmente excluir a máquina ${machine.name}`
    );
    if (resp) {
      const data = await fetchDelete(machine);
      if (data.code === 200) {
        const allData = await fetchGetAll();
        setMachines(allData);
      }
    }
  };

  return (
    <>
      <TopMenu />
      <Container>
        <Flex justify="space-between">
          <h2>
            <i className="fas fa-robot" /> Máquinas
          </h2>
          <Button onClick={handleNew}>Adicionar máquina</Button>
        </Flex>
        <FormModal
          show={showModal}
          setShow={setShowModal}
          machine={machine}
          setMachine={e => setMachine({ ...machine, name: e.target.value })}
          handleSubmit={handleSubmit}
        />
        <MachineTable
          dataList={machines}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Container>
    </>
  );
};

export default Machines;
