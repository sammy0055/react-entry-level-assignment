import styled from "styled-components";

export const StyledBar = styled.nav`
  width: 100%;
  height: 64px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  position: fixed;
  top: 0;
  z-index: 3;
`;

export const StyledDark = styled.div`
  width: 100% !important;
  height: 1000vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 64px;
  margin-left:auto;
  margin-right-auto;
  z-index: 2;
`;
