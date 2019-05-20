import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Menu = styled.nav`
  width: 100%;
  padding: 10px 15px;
  display: flex;
  justify-content: flex-end;
  background: #2c3e50;
  a {
    margin: 10px;
  }
`;

export const Link = styled(NavLink)`
  color: white;
  text-decoration: none !important;
`;
