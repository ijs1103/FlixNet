import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DetailComponents } from "./DetailComponents";

const Flow = styled(DetailComponents.Casts)`
  ::-webkit-scrollbar-thumb {
background-color: transparent;
}
`;

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
`;

const Title = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
`;

// const Grid = styled.div`
//   margin-top: 25px;
//   display: grid;
//   grid-template-columns: repeat(auto-fill, 125px);
//   grid-gap: 25px;
// `;

const Section = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <Flow>{children}</Flow>
  </Container>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Section;
