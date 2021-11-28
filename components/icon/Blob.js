import * as React from "react";
import { x } from "@xstyled/styled-components";

function Blob({ fill = "#dc354520", ...rest }) {
  return (
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <x.path
        d="M454 286.5q-4 36.5-12.5 76.5T390 411q-43 8-70 44t-67.5 23.5Q212 466 171 462t-60.5-41q-19.5-37-33-70T53 284q-11-34 0-68t12.5-77Q67 96 105 80.5t71-40Q209 16 246.5 36t65 39.5Q339 95 362 116t62 38.5q39 17.5 36.5 56.5t-6.5 75.5z"
        fill={fill}
      />
    </svg>
  );
}

export default Blob;
