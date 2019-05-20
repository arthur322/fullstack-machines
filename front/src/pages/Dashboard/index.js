import React from "react";

import TopMenu from "../../components/TopMenu";

import { Container } from "./styles";

const Dashboard = () => {
  return (
    <>
      <TopMenu />
      <Container>
        <h2>Bom dia!</h2>
      </Container>
    </>
  );
};

export default Dashboard;
