import React from "react";
import * as Icon from "react-feather";
import styled, { useColorMode } from "@xstyled/styled-components";

const SunMoonWrapper = styled.div`
  cursor: pointer;
`;

const SunMoon = () => {
  const [mode, setColorMode] = useColorMode(false);
  return (
    <SunMoonWrapper
      onClick={() => setColorMode(mode === "dark" ? "default" : "dark")}
    >
      <div>
        {mode === "dark" ? <Icon.Sun color={"#ffc107"} /> : <Icon.Moon />}
      </div>
    </SunMoonWrapper>
  );
};

export default SunMoon;
