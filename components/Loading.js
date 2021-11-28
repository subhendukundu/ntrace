import React from "react";
import { x } from "@xstyled/styled-components";

export default function Loading() {
  return (
    <x.svg
      animation="spin"
      ml={-1}
      mr={3}
      h={5}
      w={5}
      color="white"
      fill="none"
      viewBox="0 0 24 24"
    >
      <x.circle
        opacity={0.25}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <x.path
        opacity={0.75}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </x.svg>
  );
}
