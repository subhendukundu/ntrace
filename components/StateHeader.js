import React, { memo, useMemo } from "react";
import { animated, useSpring } from "react-spring";
import styled from "@xstyled/styled-components";

import { SPRING_CONFIG_NUMBERS } from "../config/constants";
import {
  formatDate,
  formatNumber,
  getStatistic,
} from "../utils/commonFunctions";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(timezone);
dayjs.extend(utc);

const Header = styled.h1`
  background-color: brickLight;
  border-radius: 5px;
  padding: 0.25rem;
  max-width: 20rem;
  color: brick;
  animation: fadeInUp;
  animation-delay: 0ms;
`;

const HeaderRight = styled.div`
  color: purpleMid;
  display: flex;
  flex-direction: column;
  text-align: right;
  animation: fadeInUp;
  animation-delay: 500ms;
`;

const StateHeaderWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  height: 5.25rem;
  justify-content: space-between;
  margin-bottom: 1rem;
  position: relative;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  display: flex;
`;

const HeaderRightWrapper = styled.h5`
  font-weight: 600;
`;

const HeaderRightH2 = styled(animated.h2)`
  color: purple;
  font-weight: 900;
`;

const SubHeader = styled.h5`
  animation: fadeInUp;
  animation-delay: 250ms;
  color: gray;
  margin-top: 0.5rem;
  font-weight: 600;
`;

function StateHeader({ data, stateCode }) {
  const total = data?.totalViews?.aggregate?.count || 0;
  const { timezone, domain } = data || {};
  const [lastUpdatedData] = data?.totalSessions || [];
  const { updatedAt } = lastUpdatedData || {};
  const formattedUpdatedDate = dayjs(updatedAt)
    .tz(timezone)
    .format("MMMM D, YYYY h:mm A");
  const totalUpdateDate = dayjs(updatedAt).tz(timezone).format("MMMM D");
  const spring = useSpring({
    total,
    config: SPRING_CONFIG_NUMBERS,
  });

  return (
    <StateHeaderWrapper>
      <div>
        <HeaderWrapper>
          <Header>{domain}</Header>
        </HeaderWrapper>
        <SubHeader>
          {`Last Updated on ${formattedUpdatedDate} ${timezone}`}
        </SubHeader>
      </div>

      <HeaderRight>
        <HeaderRightWrapper>Total viewes</HeaderRightWrapper>
        <HeaderRightH2>
          {spring.total.interpolate((total) => formatNumber(Math.floor(total)))}
        </HeaderRightH2>
        <HeaderRightWrapper className="timestamp">
          {`As of ${totalUpdateDate}`}
        </HeaderRightWrapper>
      </HeaderRight>
    </StateHeaderWrapper>
  );
}

export default memo(StateHeader);
