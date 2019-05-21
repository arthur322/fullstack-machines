import React, { useState, useEffect } from "react";

import {
  fetchGetAll,
  fetchPost,
  fetchPut,
  fetchDelete
} from "../../services/statuses";

import { Container, Button, Flex } from "../../components/SharedStyled/styled";
import TopMenu from "../../components/TopMenu";
import FormModalStatus from "../../components/FormModalStatus";
import StatusTable from "../../components/StatusTable";

const Statuses = () => {
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState({ id: "", status: "" });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getStatuses() {
      const data = await fetchGetAll();
      setStatuses(data);
      console.log(data);
    }
    getStatuses();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (status.status.length === 0) {
      alert("Nome inválido!");
    } else {
      if (!status.id) {
        const data = await fetchPost(status);
        setStatuses([...statuses, data.data]);
        setStatus({ id: "", status: "" });
      } else {
        await fetchPut(status);
        const allData = await fetchGetAll();
        setStatuses(allData);
        setStatus({ id: "", status: "" });
      }
      setShowModal(false);
    }
  };

  const handleNew = () => {
    setStatus({ id: "", status: "" });
    setShowModal(true);
  };

  const handleEdit = status => {
    setStatus(status);
    setShowModal(true);
  };

  const handleDelete = async status => {
    const resp = window.confirm(
      `Deseja realmente excluir o status ${status.status}`
    );
    if (resp) {
      const data = await fetchDelete(status);
      if (data.code === 200) {
        const allData = await fetchGetAll();
        setStatuses(allData);
      }
    }
  };

  return (
    <>
      <TopMenu />
      <Container>
        <Flex justify="space-between">
          <h2>
            <i className="fas fa-thermometer-half" /> Status
          </h2>
          <Button onClick={handleNew}>Adicionar Status</Button>
        </Flex>
        <FormModalStatus
          show={showModal}
          setShow={setShowModal}
          status={status}
          setStatus={e => setStatus({ ...status, status: e.target.value })}
          handleSubmit={handleSubmit}
        />
        <StatusTable
          dataList={statuses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Container>
    </>
  );
};

export default Statuses;
