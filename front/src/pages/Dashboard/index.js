import React, { useEffect } from "react";

import TopMenu from "../../components/TopMenu";
import { Container, Button, Flex } from "../../components/SharedStyled/styled";
import { List } from "./styles";

import { socket } from "../../services/socket";

const Dashboard = () => {
  useEffect(() => {
    socket.connect();
    socket.on("pingg", data => {
      console.log(data);
    });
    console.log('montei :)')

    return () => {
      socket.off("pingg");
      socket.disconnect();
    }
  });

  const handleSocketStop = () => {
    socket.emit("stopInverval", { oi: "oi" });
  };

  const handleSocketStart = () => {
    socket.emit("startInterval", { oi: "oi" });
  };

  return (
    <>
      <TopMenu />
      <Container>
        <Flex justify="space-between">
          <h2>
            <i className="fas fa-chart-line" /> Dashboard
          </h2>
          {/* <Button>Adicionar máquina</Button> */}
        </Flex>
        <List>
          <button onClick={handleSocketStop}>Stop</button>
          <button onClick={handleSocketStart}>Start</button>
        </List>
      </Container>
    </>
  );
};

export default Dashboard;
