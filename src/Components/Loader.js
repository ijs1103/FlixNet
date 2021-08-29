import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 28px;
  background-color: rgb(0,0,0);
`;


export default () => (
  <Container>
    <img src="https://miro.medium.com/max/1400/1*e_Loq49BI4WmN7o9ItTADg.gif" alt="loading"/>
  </Container>
);
