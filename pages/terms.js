import React from "react";
import styled, { x } from "@xstyled/styled-components";
import Navbar from "../components/Navbar";
import MetaData from "../components/MetaData";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 0;
  margin-right: 0;
  padding-top: 1rem;

  @media (min-width: md) {
    margin-left: 9rem;
    margin-right: 3rem;
    padding-top: 5rem;
  }
`;

function Terms(props) {
  return (
    <>
      <MetaData title="Terms | Ntrace Analytics" />
      <Navbar />
      <AppWrapper>
        <x.div>Coming soon!</x.div>
      </AppWrapper>
    </>
  );
}

export default Terms;
