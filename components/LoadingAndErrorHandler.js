import React from "react";
import { x } from "@xstyled/styled-components";

export default function LoadingAndErrorHandler({ loading, error, children }) {
  if (loading) {
    return (
      <x.div animation="pulse" pb={12}>
        <x.div flex="1" py={1}>
          <x.div display="flex">
            <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
            <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
            <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
          </x.div>
        </x.div>
        <x.div flex="1" py={1}>
          <x.div display="flex">
            <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
            <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
            <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
          </x.div>
        </x.div>
        <x.div flex="1" py={1}>
          <x.div display="flex">
            <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
            <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
            <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
          </x.div>
        </x.div>
      </x.div>
    );
  }

  if (error) {
    <x.div
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      There was an error, please refresh the page!
    </x.div>;
  }
  return children;
}
