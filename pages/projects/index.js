import React, { useState, lazy } from "react";
import styled, { x } from "@xstyled/styled-components";

import PrivateRoute from "../../components/PrivateRoute";
import MetaData from "../../components/MetaData";
import AddedProjects from "../../components/AddedProjects";
import Navbar from "../../components/Navbar";
import CreateProject from "../../components/CreateProject";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-left: 0;
  margin-right: 0;
  padding: 0.7rem;
  padding-top: 3rem;
  padding-bottom: 3rem;

  @media (min-width: md) {
    margin-left: 9rem;
    margin-right: 3rem;
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
`;

function Projects(props) {
  const [order, setOrderBy] = useState("asc");

  const setOrderByChange = (val) => () => {
    setOrderBy(val);
  };

  return (
    <PrivateRoute>
      <MetaData title="Projects | Cool Analytics" />
      <Navbar />
      <AppWrapper>
        <x.h1 fontSize={{ md: "4xl", xs: "2xl" }} fontWeight="500" color="gray">
          <div>Projects,</div>
          Add or Edit
        </x.h1>
        <x.div
          my={{ md: 8, xs: 4 }}
          p={2}
          borderRadius=".5rem"
          border="1px solid"
          borderColor="dropdownBorder"
          backgroundColor="grayLight"
          w="max-content"
        >
          <x.button
            fontSize="sm"
            px={8}
            py={4}
            border="none"
            borderRadius=".375rem"
            backgroundColor={order === "asc" ? "greenLight" : "transparent"}
            color="green"
            onClick={setOrderByChange("asc")}
          >
            Ascending
          </x.button>
          <x.button
            fontSize="sm"
            px={8}
            py={4}
            border="none"
            borderRadius=".375rem"
            backgroundColor={order === "desc" ? "greenLight" : "transparent"}
            color="green"
            onClick={setOrderByChange("desc")}
          >
            Descending
          </x.button>
        </x.div>
        <AddedProjects order={order} />
        <CreateProject />
      </AppWrapper>
    </PrivateRoute>
  );
}

export default Projects;
