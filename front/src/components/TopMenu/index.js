import React from "react";

import { Menu, Link } from "./styles";

const TopMenu = () => (
  <Menu>
    <Link to="/">Dashboard</Link>
    <Link to="/machines">Máquinas</Link>
    <Link to="/statuses">Status</Link>
  </Menu>
);

export default TopMenu;
