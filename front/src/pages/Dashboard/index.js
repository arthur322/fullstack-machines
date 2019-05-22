import React, { useState, useEffect } from "react";
import moment from "moment";

import TopMenu from "../../components/TopMenu";
import { Container, Button, Flex } from "../../components/SharedStyled/styled";
import { List, Card, Select } from "./styles";

import { socket } from "../../services/socket";
import { fetchGetAll, startRandom, stopRandom } from "../../services/machines";

const Dashboard = () => {
  const [frequency, setFrequency] = useState("*/5 * * * * *");
  const [socketStatus, setSocketStatus] = useState(false);
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    async function getMachines() {
      const data = await fetchGetAll();
      setMachines(data);
    }
    getMachines();

    socket.connect();

    socket.on("isCroned", () => {
      setSocketStatus(true);
      console.log("is croned");
    });

    socket.on("nowStatuses", data => {
      setSocketStatus(true);
      setMachines([]);
      setMachines(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    return () => {
      socket.off("nowStatuses");
      socket.off("isCroned");
      socket.disconnect();
    };
  }, []);

  const handleStartRandom = async () => {
    await startRandom(frequency);
    setSocketStatus(true);
  };

  const handleStopRandom = async () => {
    await stopRandom();
    setSocketStatus(false);
  };

  const handleFreqChange = e => {
    setFrequency(e.target.value);
  };

  return (
    <>
      <TopMenu />
      <Container>
        <Flex justify="space-between">
          <h2>
            <i className="fas fa-chart-line" /> Dashboard
          </h2>
          {socketStatus ? (
            <Button onClick={handleStopRandom}>Parar simulador</Button>
          ) : (
            <>
              <Select onChange={handleFreqChange}>
                <option value="*/5 * * * * *">5 segundos</option>
                <option value="*/15 * * * * *">15 segundos</option>
                <option value="*/30 * * * * *">30 segundos</option>
                <option value="* * * * *">1 minuto</option>
              </Select>
              <Button onClick={handleStartRandom}>Iniciar simulador</Button>
            </>
          )}
        </Flex>
        <List>
          {machines.map(machine => (
            <Card key={machine.id}>
              <h4>{machine.name}</h4>
              <p>
                {machine.lastStatus.length ? machine.lastStatus[0].code : ""}
              </p>
              <p>
                {machine.lastStatus.length ? machine.lastStatus[0].status : ""}
              </p>
              <p>
                Atualizado em:{" "}
                {machine.lastStatus.length
                  ? moment(
                      machine.lastStatus[0].status_history.createdAt
                    ).format("DD/MM/YYYY HH:mm:ss")
                  : ""}
              </p>
            </Card>
          ))}
        </List>
      </Container>
    </>
  );
};

export default Dashboard;
