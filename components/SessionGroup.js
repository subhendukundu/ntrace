import PropTypes from "prop-types";
import React, { lazy } from "react";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import LoadingAndErrorHandler from "./LoadingAndErrorHandler";
import { showingDateFor } from "../atoms";

// import { GET_PROJECTS_DETAILS } from '../../graphql/subscription'
import Table from "./Table";
const endDate = dayjs().add(1, "day").format("YYYY-MM-DD");

function SessionGroup({ projectId, query, columns, shareId, view }) {
  const [selectedDate] = useAtom(showingDateFor);
  const startDate = dayjs().subtract(selectedDate, "day").format("YYYY-MM-DD");

  const {
    loading,
    error,
    data = {},
  } = useQuery(query, {
    skip: !projectId,
    variables: {
      projectId,
      dateRange: `[${startDate}, ${endDate}]`,
      colname: view,
    },
    context: shareId
      ? {
          headers: {
            "x-hasura-share-id": shareId,
          },
        }
      : {},
  });

  const { table = [] } = data;

  return (
    <LoadingAndErrorHandler loading={loading} error={error}>
      <Table columns={columns} data={table} />
    </LoadingAndErrorHandler>
  );
}

SessionGroup.propTypes = {
  columns: PropTypes.any,
  projectId: PropTypes.string,
  query: PropTypes.any,
  shareId: PropTypes.string,
  view: PropTypes.any,
};

export default SessionGroup;
