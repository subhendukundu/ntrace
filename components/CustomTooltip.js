import React from "react";
import styled from "@xstyled/styled-components";

import {
  capitalize,
  formatNumber,
  getStatisticData,
} from "../utils/commonFunctions";

const Stats = styled.div`
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
  pointer-events: none;
`;

const Title = styled.h5`
  color: ${({ statistic, theme }) => getStroke(statistic, theme)};
  margin-bottom: 1;
`;

const StatsBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ statistic, theme }) => getStatsBottomColor(statistic, theme)};

  h6 {
    margin-left: 5px;
  }
`;

function getStroke(statistic, theme) {
  switch (statistic) {
    case "users":
      return theme.colors.cherryMid;

    case "active":
      return theme.colors.blueMid;

    case "sessions":
      return theme.colors.greenMid;

    case "bounce":
      return theme.colors.grayMid;

    default:
      return "";
  }
}

function getStatsBottomColor(statistic, theme) {
  switch (statistic) {
    case "users":
      return theme.colors.cherry;

    case "active":
      return theme.colors.blue;

    case "sessions":
      return theme.colors.green;

    case "bounce":
      return theme.colors.gray;

    default:
      return "";
  }
}

function CustomTooltip({ statistic, item, payload = [], defaultData }) {
  return (
    <Stats>
      <Title statistic={statistic}>{capitalize(item.displayName)}</Title>
      <Title statistic={statistic}>
        {payload?.length && payload[0]?.payload
          ? payload[0]?.payload?.name
          : "Today"}
      </Title>
      <StatsBottom statistic={statistic}>
        <h2>
          {formatNumber(
            payload && payload?.length && payload[0]
              ? payload[0].value
              : getStatisticData(defaultData, statistic).count,
            item.format !== "short" ? item.format : "int",
            statistic
          )}
        </h2>
      </StatsBottom>
    </Stats>
  );
}

export default CustomTooltip;
