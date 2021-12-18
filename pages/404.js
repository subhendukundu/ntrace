import React from "react";
import { x, useUp } from "@xstyled/styled-components";

import LottieAnimations from "../components/LottieAnimations";
import MetaData from "../components/MetaData";

export default function NotFound() {
  const upMd = useUp("md");
  return (
    <>
      <MetaData title="Not Found | Ntrace Analytics" />
      <x.div
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <LottieAnimations animationName="not-found" width={upMd ? 600 : 300} />
      </x.div>
    </>
  );
}
