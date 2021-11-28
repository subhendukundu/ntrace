import React from "react";
import styled, { x } from "@xstyled/styled-components";
import { useQuery } from "@apollo/client";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import Dropdown from "./Dropdown";

import { GET_ALL_PROJECTS } from "../graphql/queries";
import { showingDateFor } from "../atoms";

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  * {
    align-self: center;
  }
`;

const Label = styled.label`
  color: gray;
  font-size: 0.75rem;
  margin-bottom: 1rem;
  animation: fadeInUp;
  animation-delay: 250ms;
`;

const DropdownWrapper = styled.div`
  animation: fadeInUp;
  animation-delay: 500ms;
  min-width: calc(60%);
  display: flex;
`;
function Search({ shareId }) {
  const history = useRouter();
  const { name } = history.query;
  const [selectedDate, setDate] = useAtom(showingDateFor);
  const { loading, error, data } = useQuery(
    GET_ALL_PROJECTS,
    shareId
      ? {
          context: {
            headers: {
              "x-hasura-share-id": shareId,
            },
          },
        }
      : {}
  );

  console.log("[data]", data);

  const setSelectedDate = (date) => () => {
    console.log(date);
    setDate(date);
  };

  function onDropdownChange(e) {
    history.push(`/projects/${e.target.value}`);
  }

  return (
    <SearchWrapper>
      <Label>Filter your websites or apps</Label>
      <DropdownWrapper>
        <Dropdown
          value={name}
          options={data?.project || []}
          onChange={onDropdownChange}
        />
      </DropdownWrapper>
      <x.div
        my={{ md: 8, xs: 4 }}
        p={2}
        borderRadius=".5rem"
        border="1px solid"
        borderColor="dropdownBorder"
        backgroundColor="grayLight"
        w="max-content"
        display="flex"
      >
        <x.button
          fontSize="sm"
          px={4}
          py={2}
          borderRadius=".375rem"
          backgroundColor={selectedDate === 0 ? "greenLight" : "transparent"}
          color="green"
          border="none"
          onClick={setSelectedDate(0)}
        >
          Today
        </x.button>
        <x.button
          fontSize="sm"
          px={4}
          py={2}
          borderRadius=".375rem"
          backgroundColor={selectedDate === 7 ? "greenLight" : "transparent"}
          color="green"
          border="none"
          onClick={setSelectedDate(7)}
        >
          Last Week
        </x.button>
        <x.button
          fontSize="sm"
          px={4}
          py={2}
          borderRadius=".375rem"
          backgroundColor={selectedDate === 30 ? "greenLight" : "transparent"}
          color="green"
          border="none"
          onClick={setSelectedDate(30)}
        >
          Last Month
        </x.button>
      </x.div>
    </SearchWrapper>
  );
}

export default Search;
