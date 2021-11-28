import PropTypes from "prop-types";
import React, { memo, useEffect } from "react";

import styled, { useTheme, useDown } from "@xstyled/styled-components";
import dayjs from "dayjs";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useQuery } from "@apollo/client";
import { useAtom } from "jotai";

import CustomDot from "./CustomDot";

import { PRIMARY_STATISTICS, STATISTIC_DEFINITIONS } from "../config/constants";

import { GET_SESSIONS_COUNT_FOR_TIMESERIES } from "../graphql/queries";

import { showingDateFor } from "../atoms";

const MinigraphWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 100%;
`;

const SvgParent = styled.div`
  width: 100%;
  height: 75px;

  svg {
    width: 100%;
  }
`;

function Minigraphs({ projectId, shareId }) {
  const [selectedDate] = useAtom(showingDateFor);
  const dateFor = dayjs().subtract(selectedDate, "day").format("YYYY-MM-DD");
  const theme = useTheme();
  const downMd = useDown("md");
  const {
    loading,
    error,
    data = {},
  } = useQuery(GET_SESSIONS_COUNT_FOR_TIMESERIES, {
    variables: {
      projectId: projectId,
      at: {
        _gte: dateFor,
      },
    },
    context: shareId
      ? {
          headers: {
            "x-hasura-share-id": shareId,
          },
        }
      : {},
  });

  return (
    <MinigraphWrapper>
      {PRIMARY_STATISTICS.map((statistic, index) => {
        const statisticDetails = STATISTIC_DEFINITIONS[statistic];
        const statisticColor = statisticDetails.color;
        const statisticDotColor = statisticDetails.dotColor;
        const strokeColor = theme.colors[statisticColor];
        const dotColor = theme.colors[statisticDotColor];
        const currentData = data[statistic] || [];
        return (
          <SvgParent key={statistic}>
            <ResponsiveContainer width="100%" height={75}>
              <LineChart
                data={currentData}
                margin={{
                  top: 10,
                  right: downMd ? 10 : 20,
                  left: downMd ? 10 : 20,
                  bottom: 10,
                }}
              >
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={strokeColor}
                  fill={strokeColor}
                  strokeWidth={2}
                  dot={
                    <CustomDot
                      length={currentData.length - 1}
                      color={dotColor}
                    />
                  }
                />
              </LineChart>
            </ResponsiveContainer>
          </SvgParent>
        );
      })}
    </MinigraphWrapper>
  );
}

Minigraphs.propTypes = {
  projectId: PropTypes.string,
  shareId: PropTypes.string,
};

export default memo(Minigraphs);
