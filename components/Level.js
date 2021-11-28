import PropTypes from "prop-types";
import React, { memo, useMemo } from "react";

import equal from "fast-deep-equal";
import { animated, useSpring } from "react-spring";
import styled from "@xstyled/styled-components";

import {
  PRIMARY_STATISTICS,
  STATISTIC_CONFIGS,
  SPRING_CONFIG_NUMBERS,
} from "../config/constants";
import {
  capitalize,
  formatNumber,
  getStatisticData,
} from "../utils/commonFunctions";

function getColor(statistic, theme) {
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

function getMidColor(statistic, theme) {
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

const LevelItemWrapper = styled(animated.div)`
  display: flex;
  flex-direction: column;
  width: calc(25%);
  animation: fadeInUp;

  & > * {
    align-self: center;
  }
`;

const LevelWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const H5Wrapper = styled.h5`
  color: ${({ statistic, theme }) => getColor(statistic, theme)};
  font-weight: 600;
  margin-top: 1.3rem;
`;

const H4Wrapper = styled(animated.h4)`
  color: ${({ statistic, theme }) => getMidColor(statistic, theme)};
  margin-top: 1.1rem;
  font-size: 13px;
  font-weight: 900;
`;

const H1Wrapper = styled(animated.h1)`
  color: ${({ statistic, theme }) => getColor(statistic, theme)};
  margin-top: 1rem;
  font-size: 24px;
  font-weight: 600;

  @media (max-width: md) {
    font-size: 3.75vw;
  }
`;

function PureLevelItem({ statistic, total, delta }) {
  const spring = useSpring({
    total: total,
    delta: delta,
    config: SPRING_CONFIG_NUMBERS,
  });

  const statisticConfig = STATISTIC_CONFIGS[statistic];

  return (
    <>
      <H5Wrapper statistic={statistic}>
        {capitalize(statisticConfig.displayName)}
      </H5Wrapper>
      <H4Wrapper statistic={statistic}>
        {statistic !== "active"
          ? spring.delta.interpolate((delta) => {
              const currentDelta = formatNumber(
                delta,
                statisticConfig.format,
                statistic
              );
              return currentDelta === 0
                ? 0
                : currentDelta > 0
                ? `+${currentDelta}`
                : currentDelta;
            })
          : "\u00A0"}
      </H4Wrapper>
      <H1Wrapper statistic={statistic}>
        {spring.total.interpolate(
          (total) => `${formatNumber(total, statisticConfig.format, statistic)}`
        )}
      </H1Wrapper>
    </>
  );
}

PureLevelItem.propTypes = {
  delta: PropTypes.any,
  statistic: PropTypes.string,
  total: PropTypes.any,
};

const LevelItem = memo(PureLevelItem);

function Level({ data }) {
  const trail = useMemo(() => {
    const styles = [];

    PRIMARY_STATISTICS.map((statistic, index) => {
      styles.push({
        animationDelay: `${750 + index * 250}ms`,
      });
      return null;
    });
    return styles;
  }, []);

  return (
    <LevelWrapper>
      {PRIMARY_STATISTICS.map((statistic, index) => (
        <LevelItemWrapper
          key={index}
          style={trail[index]}
          statistic={statistic}
        >
          <LevelItem
            {...{ statistic }}
            total={getStatisticData(data, statistic).count}
            delta={getStatisticData(data, statistic).delta}
          />
        </LevelItemWrapper>
      ))}
    </LevelWrapper>
  );
}

Level.propTypes = {
  data: PropTypes.any,
};

const isEqual = (prevProps, currProps) => {
  if (!equal(prevProps.data, currProps.data)) {
    return false;
  }
  return true;
};

export default memo(Level, isEqual);
