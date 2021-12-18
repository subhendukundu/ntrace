import React, { lazy, useEffect } from "react";
import styled from "@xstyled/styled-components";
import { useSessionStorage } from "react-use";
import { useQuery } from "@apollo/client";
import { useRouter } from 'next/router'
import dayjs from "dayjs";
import { useAtom } from "jotai";

import Search from "../../../components/Search";
import Actions from "../../../components/Actions";
import MapSwitcher from "../../../components/MapSwitcher";
import Level from "../../../components/Level";
import MapPanel from "../../../components/MapPanel";
import StateHeader from "../../../components/StateHeader";
import Navbar from "../../../components/Navbar";
import PrivateRoute from "../../../components/PrivateRoute";
import CountryCount from "../../../components/CountryCount";

import {
  GET_PROJECTS_DETAILS,
  GET_SESSIONS_COUNT_WITH_COUNTRY_NAME,
  GET_SESSIONS_COUNT_WITH_GROUP,
  GET_SESSIONS_COUNT_WITH_PAGE_GROUP,
} from "../../../graphql/queries";

import { selectedCountry, showingDateFor } from "../../../atoms";
import MetaData from "../../../components/MetaData";
import SessionGroup from "../../../components/SessionGroup";
import Map from "../../../components/Map";
import Timeseries from "../../../components/Timeseries";
import Minigraphs from "../../../components/Minigraphs";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 0;
  margin-right: 0;
  padding-top: 1rem;

  @media (min-width: md) {
    margin-left: 9rem;
    margin-right: 3rem;
    padding-top: 5rem;
  }
`;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 34rem;

  @media (max-width: md) {
    width: 100%;
  }
`;

const HomeLeft = styled(HomeWrapper)`
  margin-right: 2.5rem;
  min-height: 60rem;

  @media (max-width: md) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const HomeRight = styled(HomeWrapper)`
  margin-left: 2.5rem;
  min-height: 10rem;

  @media (max-width: md) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const MapLevelWrapper = styled.div`
  position: relative;
  margin-top: 1rem;
`;

const countryColumns = [
  {
    Header: "Country",
    accessor: "country.name",
  },
  {
    Header: "Count",
    accessor: "count",
  },
];

const browserColumns = [
  {
    Header: "Browser",
    accessor: "col",
  },
  {
    Header: "Count",
    accessor: "cnt",
  },
];

const pagesColumns = [
  {
    Header: "Pages",
    accessor: "col",
  },
  {
    Header: "Count",
    accessor: "cnt",
  },
];

const referrerColumns = [
  {
    Header: "Referrer",
    accessor: "col",
  },
  {
    Header: "Count",
    accessor: "cnt",
  },
];

const cityColumns = [
  {
    Header: "City",
    accessor: "col",
  },
  {
    Header: "Count",
    accessor: "cnt",
  },
];

function calculateBouce(session = 0, user = 0) {
  const bounce = ((session - user) / session) * 100;
  return isNaN(bounce) ? 0 : bounce;
}

function getStatistic(data, statistic) {
  switch (statistic) {
    case "users":
      return {
        count: data?.users?.aggregate?.sum?.count || 0,
        delta: data?.users?.aggregate?.sum?.delta || 0,
      };

    case "active":
      return {
        count: data?.project?.active?.aggregate?.count || 0,
        delta: data?.project?.active?.aggregate?.sum?.delta || 0,
      };

    case "sessions":
      return {
        count: data?.sessions?.aggregate?.sum?.count || 0,
        delta: data?.sessions?.aggregate?.sum?.delta || 0,
      };

    case "bounce":
      return {
        count: calculateBouce(
          data?.sessions?.aggregate?.sum?.count,
          data?.users?.aggregate?.sum?.count
        ),
        delta: calculateBouce(
          data?.sessions?.aggregate?.sum?.delta,
          data?.users?.aggregate?.sum?.delta
        ),
      };

    default:
      return "";
  }
}
const updatedAt = dayjs().subtract(1, "minutes");

function ListPage() {
  const router = useRouter();
  const { name } = router.query;
  const [mapStatistic, setMapStatistic] = useSessionStorage(
    "mapStatistic",
    "active"
  );
  const [, setSelectedCountry] = useAtom(selectedCountry);
  const [selectedDate] = useAtom(showingDateFor);
  const dateFor = dayjs().subtract(selectedDate, "days").format("YYYY-MM-DD");
  console.log("dateFordateFor", dateFor);
  /* const { loading, error, data = {} } = useSubscription(GET_PROJECTS_DETAILS, {
    variables: {
      projectId: name,
      where: {
        created_at: {
          _gte: dateFor
        }
      }
    }
  }) */
  const {
    loading,
    error,
    data = {},
  } = useQuery(GET_PROJECTS_DETAILS, {
    skip: !name,
    variables: {
      projectId: name,
      at: {
        _gte: dateFor,
      },
      updatedAt: {
        _gte: updatedAt,
      },
    },
  });

  console.log('[data]', data)

  const { project, sessions, users } = data;

  const currentStatics = getStatistic(data, mapStatistic)?.count;

  useEffect(() => {
    setSelectedCountry({
      id: "",
      name: "",
      count: currentStatics || 0,
    });
  }, [currentStatics]);

  return (
      <PrivateRoute>
        <Navbar />
        <MetaData title="Dashboard | Ntrace Analytics" noTracking />
        <AppWrapper>
          <HomeLeft>
            <Search />
            <Actions />
            <MapLevelWrapper>
              <MapSwitcher
                mapStatistic={mapStatistic}
                setMapStatistic={setMapStatistic}
              />
              <Level data={{ ...project, sessions, users }} />
              <Minigraphs projectId={name} />
            </MapLevelWrapper>
            <CountryCount
              projectId={name}
              query={GET_SESSIONS_COUNT_WITH_COUNTRY_NAME}
              columns={countryColumns}
            />
            <SessionGroup
              projectId={name}
              query={GET_SESSIONS_COUNT_WITH_GROUP}
              columns={browserColumns}
              view="client_name"
            />
            <SessionGroup
              projectId={name}
              query={GET_SESSIONS_COUNT_WITH_PAGE_GROUP}
              columns={pagesColumns}
              view="pathname"
            />
            <SessionGroup
              projectId={name}
              query={GET_SESSIONS_COUNT_WITH_GROUP}
              columns={referrerColumns}
              view="referrer"
            />
            <SessionGroup
              projectId={name}
              query={GET_SESSIONS_COUNT_WITH_GROUP}
              columns={cityColumns}
              view="city"
            />
          </HomeLeft>
          <HomeRight>
            <StateHeader data={project} />
            <MapPanel mapStatistic={mapStatistic} data={project} />
            <Map mapStatistic={mapStatistic} projectId={name} />
            <Timeseries
              chartType="total"
              projectId={name}
              data={{ ...project, sessions, users }}
            />
          </HomeRight>
        </AppWrapper>
      </PrivateRoute>
  );
}

export default ListPage;
