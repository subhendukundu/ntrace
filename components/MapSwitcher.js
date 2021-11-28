import React, { memo, useCallback } from "react";
import { animated } from "react-spring";
import { useMeasure } from "react-use";
import styled from "@xstyled/styled-components";

import { PRIMARY_STATISTICS } from "../config/constants";

function getBackGround(statistic, theme) {
  switch (statistic) {
    case "users":
      return theme.colors.cherryLight;
    case "active":
      return theme.colors.blueLight;
    case "sessions":
      return theme.colors.greenLight;
    case "bounce":
      return theme.colors.grayLight;
    default:
      return "";
  }
}

const MapSwitcherWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  width: 100%;
`;

const HighlightWrapper = styled(animated.div)`
  pointer-events: none;
  position: absolute;
  border-radius: 5px;
  cursor: pointer;
  height: 13rem;
  width: calc(25%);
  z-index: 10;
  background-color: ${({ statistic, theme }) =>
    getBackGround(statistic, theme)};
  transform: translateX(
    ${({ statistic, width }) =>
      0.25 * PRIMARY_STATISTICS.indexOf(statistic) * width}px
  );
  transition: all 0.5s;
`;

const ClickableWrapper = styled(animated.div)`
  border-radius: 5px;
  cursor: pointer;
  height: 13rem;
  width: calc(25%);
  z-index: 10;

  transition: background 0.15s ease-in-out;

  &:hover {
    background-color: ${({ statistic, theme }) =>
      getBackGround(statistic, theme)};
  }
`;

const MapSwitcher = ({ mapStatistic, setMapStatistic }) => {
  const [mapSwitcherWrapper, { width }] = useMeasure();
  /*   const [mapSwitcher, { width }] = useMeasure()
  const [clicked, setClicked] = useState(false)
  const [count, setCount] = useState(0) */
  /*   const [spring, set] = useSpring(() => ({
    opacity: 0,
    backgroundColor: `${STATISTIC_CONFIGS[mapStatistic].color}20`,
    transform: `translateX(${width * PRIMARY_STATISTICS.indexOf(mapStatistic) * 0.25
            }px)`,
    config: config.gentle
  })) */

  /*   useEffect(() => {
    if (width > 0) {
      ReactDOM.unstable_batchedUpdates(() => {
        set({
          transform: `translateX(${width * PRIMARY_STATISTICS.indexOf(mapStatistic) * 0.25
                        }px)`,
          opacity: 1,
          backgroundColor: `${STATISTIC_CONFIGS[mapStatistic].color}20`,
          delay: count === 0 ? 1500 : 0,
          onStart: setClicked.bind(this, true),
          onRest: setClicked.bind(this, false)
        })
      })
    }
  }, [count, mapStatistic, set, width]) */

  const handleClick = useCallback(
    (statistic) => {
      setMapStatistic(statistic);
    },
    [setMapStatistic]
  );

  return (
    <MapSwitcherWrapper ref={mapSwitcherWrapper}>
      <HighlightWrapper
        statistic={mapStatistic}
        width={width}
      ></HighlightWrapper>

      {PRIMARY_STATISTICS.map((statistic, index) => (
        <ClickableWrapper
          key={index}
          statistic={statistic}
          onClick={handleClick.bind(this, statistic)}
        ></ClickableWrapper>
      ))}
    </MapSwitcherWrapper>
  );
};

const isEqual = (prevProps, currProps) => {
  if (prevProps.mapStatistic !== currProps.mapStatistic) {
    return false;
  }
  return true;
};

export default memo(MapSwitcher, isEqual);
