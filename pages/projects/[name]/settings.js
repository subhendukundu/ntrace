import React, { lazy } from "react";
import { useRouter } from 'next/router'
import styled, { x } from "@xstyled/styled-components";

import PrivateRoute from "../../../components/PrivateRoute";
import SettingsDetails from "../../../components/SettingsDetails";
import MetaData from "../../../components/MetaData";
import Navbar from "../../../components/Navbar";

const H1 = styled.h1`
  color: gray;
`;

function Details() {
  const router = useRouter()
  const { name } = router.query

  return (
    <PrivateRoute>
      <Navbar />
      <MetaData title="Details | Ntrace Analytics" />
      <x.div
        ml={{ md: "9rem", xs: 4 }}
        mr={{ md: "3rem", xs: 4 }}
        mb={8}
        pt={{ md: "5rem", xs: "3rem" }}
      >
        <H1>
          <div>Details,</div>
          Ntrace Analytics
        </H1>
        <SettingsDetails projectId={name} />
      </x.div>
    </PrivateRoute>
  );
}

export default Details;
