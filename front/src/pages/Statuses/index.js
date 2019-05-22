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
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState({ id: "", status: "", code: "" });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getStatuses() {
      const data = await fetchGetAll();
      setStatuses(data);
      setLoading(false);
      console.log(data);
    }
    getStatuses();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (status.status.length === 0 || status.code.length === 0) {
      alert("Campos obrigatórios em branco!");
    } else {
      if (!status.id) {
        const data = await fetchPost(status);
        setStatuses([...statuses, data.data]);
        setStatus({ id: "", status: "", code: "" });
      } else {
        await fetchPut(status);
        const allData = await fetchGetAll();
        setStatuses(allData);
        setStatus({ id: "", status: "", code: "" });
      }
      setShowModal(false);
    }
  };

  const handleNew = () => {
    setStatus({ id: "", status: "", code: "" });
    setShowModal(true);
  };

  const handleEdit = status => {
    setStatus(status);
    setShowModal(true);
  };

  const handleDelete = async status => {
    const resp = window.confirm(
      `Deseja realmente excluir o status ${status.status}?`
    );
    if (resp) {
      try {
        const data = await fetchDelete(status);
        if (data.code === 200) {
          setStatuses([]);
          const allData = await fetchGetAll();
          setStatuses(allData);
        }
      } catch (error) {
        alert("Status já está sendo utilizado em outro relacionamento!");
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
          setStatus={e =>
            setStatus({ ...status, [e.target.name]: e.target.value })
          }
          handleSubmit={handleSubmit}
        />
        <StatusTable
          loading={loading}
          dataList={statuses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Container>
    </>
  );
};

export default Statuses;
