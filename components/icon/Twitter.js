import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width={20}
      height={30}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.273 0v2.64A4.4 4.4 0 01.88 7.032H0v7.032h3.516v6.269c0 5.33 4.337 9.668 9.668 9.668h6.152v-8.79h-6.152a.88.88 0 01-.88-.878v-6.27h7.032v-7.03h-7.031V0H5.273zm12.305 8.79v3.515h-7.031v8.027a2.64 2.64 0 002.637 2.637h4.394v5.273h-4.394c-4.362 0-7.91-3.548-7.91-7.91v-8.027H1.757V8.727a6.133 6.133 0 003.22-1.507l.003.002a6.155 6.155 0 002.05-4.585v-.88h3.516V8.79h7.031z"
        fill="#F87E0F"
      />
    </svg>
  );
}

const Twitter = React.memo(SvgComponent);
export default Twitter;
