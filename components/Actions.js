import React from "react";
import styled from "@xstyled/styled-components";
import dayjs from "dayjs";

const H5Wrapper = styled.h5`
  animation: fadeInUp;
  animation-delay: 750ms;
  color: gray;
`;

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 1rem;

  > * {
    align-self: center;
  }
`;

export default function Actions() {
  const date = new Date();
  const formattedUpdatedDate = dayjs(date).format("MMMM D, YYYY h:mm A");
  return (
    <ActionsWrapper>
      <H5Wrapper>{formattedUpdatedDate}</H5Wrapper>
    </ActionsWrapper>
  );
}
