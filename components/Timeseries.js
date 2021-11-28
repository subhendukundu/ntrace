import React, { memo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@apollo/client";
import { useAtom } from "jotai";

import styled, { x, useTheme } from "@xstyled/styled-components";
import dayjs from "dayjs";

import CustomTooltip from "./CustomTooltip";
import { showingDateFor } from "../atoms";

import { STATISTIC_DEFINITIONS } from "../config/constants";

import { GET_SESSIONS_COUNT_FOR_TIMESERIES } from "../graphql/queries";

function getBackGround(statistic) {
  switch (statistic) {
    case "users":
      return "cherryLight";

    case "active":
      return "blueLight";

    case "sessions":
      return "greenLight";

    case "bounce":
      return "grayLight";

    default:
      return "";
  }
}

const TimeseriesWrapper = styled.div`
  align-self: center;
  width: 100%;
`;

function tickFormatter(data) {
  const date = dayjs(data);
  return date.isValid() ? dayjs(data).format("HH:mm") : dayjs().format("HH:mm");
}

function Timeseries({ data: defaultData, projectId, shareId }) {
  const theme = useTheme();
  const [selectedDate] = useAtom(showingDateFor);
  const dateFor = dayjs().subtract(selectedDate, "day").format("YYYY-MM-DD");
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
    <TimeseriesWrapper>
      {Object.keys(STATISTIC_DEFINITIONS).map((statistic) => {
        const item = STATISTIC_DEFINITIONS[statistic];
        const strokeColor = theme.colors[item.color];
        return (
          <x.div
            w="100%"
            h="12rem"
            bg={getBackGround(statistic)}
            mb={4}
            position="relative"
            key={statistic}
          >
            <ResponsiveContainer width="100%" height={192}>
              <LineChart
                data={data[statistic]}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 0,
                  left: 10,
                  bottom: 0,
                }}
              >
                <XAxis
                  dataKey="hour"
                  tickLine={{
                    stroke: strokeColor,
                    fill: strokeColor,
                  }}
                  axisLine={{
                    stroke: strokeColor,
                    fill: strokeColor,
                  }}
                  tick={{ fontSize: 12, fill: strokeColor }}
                  tickFormatter={tickFormatter}
                />
                <YAxis
                  orientation="right"
                  tickLine={{
                    stroke: strokeColor,
                    fill: strokeColor,
                  }}
                  axisLine={{
                    stroke: strokeColor,
                    fill: strokeColor,
                  }}
                  tick={{ fontSize: 12, fill: strokeColor }}
                />
                <Tooltip
                  active
                  wrapperStyle={{
                    visibility: "visible",
                  }}
                  position={{ x: 10, y: 10 }}
                  content={
                    <CustomTooltip
                      item={item}
                      statistic={statistic}
                      defaultData={defaultData}
                    />
                  }
                  cursor={false}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  strokeWidth={4}
                  stroke={strokeColor}
                  fill={strokeColor}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </x.div>
        );
      })}
    </TimeseriesWrapper>
  );
}

export default memo(Timeseries);
