import React, { lazy } from "react";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import LoadingAndErrorHandler from "./LoadingAndErrorHandler";
import Table from "./Table";
import { showingDateFor } from "../atoms";

// import { GET_PROJECTS_DETAILS } from '../../graphql/subscription'

const endDate = dayjs().format("YYYY-MM-DD");

function CountryCount({ projectId, query, columns, shareId }) {
  const [selectedDate] = useAtom(showingDateFor);
  const startDate = dayjs().subtract(selectedDate, "day").format("YYYY-MM-DD");

  const {
    loading,
    error,
    data = {},
  } = useQuery(query, {
    variables: {
      projectId,
      endDate,
      startDate,
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

export default CountryCount;
