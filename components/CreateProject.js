import React, { useState, useCallback } from "react";
import styled, { x } from "@xstyled/styled-components";
import { useMutation } from "@apollo/client";
import { useNhostAuth } from "@nhost/react-auth";

import Dropdown from "./Dropdown";
import Loading from "./Loading";

import { INSERT_PROJECT, UPDATE_PROJECT_BY_ID } from "../graphql/mutation";
import { timeZones } from "../config/constants";

const Button = styled.button`
  appearance: none;
  background-color: greenLight;
  background-position-x: calc(100% - 0.4rem);
  background-position-y: 50%;
  background-repeat: no-repeat;
  background-size: 0.6rem;
  border-color: dropdownBorder;
  border-radius: 4px;
  color: green;
  cursor: pointer;
  font-weight: 600;
  padding: 3 6;
  width: auto;
  text-align: center;
  animation: fadeInUp;
  animation-delay: 0ms;
  display: flex;
  justify-content: center;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: dorpdownHover;
  }
`;

const Base = styled.div`
  border: 2px solid;
  border-color: dropdownBorder;
  display: flex;
  align-items: center;
  position: relative;
  background-color: dropdown;
  border-radius: 5px;
  margin: 1.8rem 0;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 350px;

  &:focus-within {
    @media (-webkit-min-device-pixel-ratio: 0) : {
      outlinecolor: -webkit-focus-ring-color;
      outlinestyle: auto;
    }
    outline-width: 2px;
    outline-style: solid;
    outline-color: Highlight;
  }
`;

function CreateProject({
  editEnabled,
  domain,
  timezone = "Etc/GMT+12",
  disableEdits = {},
  projectId,
}) {
  const { user } = useNhostAuth();
  console.log(user);
  const [insertItem] = useMutation(
    editEnabled ? UPDATE_PROJECT_BY_ID : INSERT_PROJECT
  );
  const [isShowingForm, setShowForm] = useState(editEnabled);
  const [selected, setSelectedData] = useState({
    domain,
    timezone,
    loading: false,
    error: null,
  });

  function showForm() {
    setShowForm(true);
  }

  const handleChange = useCallback(({ target: { name, value } }) => {
    setSelectedData((prevState) => ({
      ...prevState,
      [name]: value,
      error: null,
    }));
  }, []);

  function isValidUrl(val) {
    const regDomain =
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    if (!regDomain.test(val)) {
      return false;
    }
    return true;
  }

  async function submitHandler(event) {
    event.preventDefault();
    setSelectedData((prevState) => ({
      ...prevState,
      loading: true,
    }));
    if (selected.domain.length > 0 && isValidUrl(selected.domain)) {
      try {
        const data = await insertItem({
          variables: editEnabled
            ? {
                projectId,
                data: {
                  timezone: selected.timezone,
                },
              }
            : {
                item: {
                  domain: selected.domain,
                  timezone: selected.timezone,
                  user_id: user?.id
                },
              },
        });
        setSelectedData((prevState) =>
          editEnabled
            ? {
                ...prevState,
                loading: false,
              }
            : {
                domain: "",
                timezone: timeZones[0].key,
                loading: false,
                error: null,
              }
        );
        setShowForm(false);
      } catch (error) {
        console.error(error);
        if (error.toString().includes("domain_check")) {
          setSelectedData({
            loading: false,
            error: "Please add domain without http or https!",
          });
        } else {
          setSelectedData({
            loading: false,
            error: "There was an error. Try again!",
          });
        }
      }
    } else {
      setSelectedData((prevState) => ({
        ...prevState,
        error:
          "Input must be only domain with no https, https or special character at the end",
        loading: false,
      }));
    }
  }

  return (
    <x.div>
      {isShowingForm ? (
        <x.form
          animation="fadeInUp"
          animationDelay="0ms"
          onSubmit={submitHandler}
          display="flex"
          flexDirection="column"
        >
          <x.label color="gray" fontSize={{ md: "xl", xs: "lg" }}>
            Add domain
          </x.label>
          <Base>
            <x.span color="silver" fontSize="16px">
              https://
            </x.span>
            <x.input
              type="text"
              name="domain"
              onChange={handleChange}
              fontSize="16px"
              py={3}
              px={1}
              placeholder="Enter domain name"
              color="gray"
              w="100%"
              outline="none"
              border="none"
              backgroundColor="dropdown"
              value={selected.domain}
              disabled={disableEdits.domain}
            />
          </Base>
          {selected.error && (
            <x.div
              fontSize="sm"
              color="red"
              mt={-6}
              animation="fadeInUp"
              animationDelay="0ms"
            >
              {selected.error}
            </x.div>
          )}
          <x.label color="gray" fontSize={{ md: "xl", xs: "lg" }}>
            Reporting Timezone
          </x.label>
          <Dropdown
            value={selected.timezone}
            options={timeZones}
            styles={{ maxWidth: 350, my: "1.5rem", py: 3 }}
            onChange={handleChange}
            name="timezone"
          />
          <div>
            <Button type="submit">
              {selected.loading && <Loading />}
              Submit
            </Button>
          </div>
        </x.form>
      ) : (
        <Button onClick={showForm}>Add another</Button>
      )}
    </x.div>
  );
}

export default CreateProject;
