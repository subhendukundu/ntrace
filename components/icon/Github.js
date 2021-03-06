import * as React from "react";

function Github(props) {
  const { fill = "#fff", width = 40, height = 40 } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 0C8.957 0 0 8.955 0 20c0 8.837 5.73 16.333 13.678 18.978.999.185 1.322-.435 1.322-.961v-3.724c-5.563 1.21-6.722-2.36-6.722-2.36-.91-2.311-2.221-2.926-2.221-2.926-1.815-1.242.138-1.215.138-1.215 2.008.14 3.065 2.061 3.065 2.061 1.783 3.057 4.678 2.174 5.82 1.662.178-1.292.697-2.175 1.27-2.673-4.442-.509-9.112-2.224-9.112-9.885 0-2.185.782-3.969 2.06-5.369-.206-.505-.891-2.54.195-5.293 0 0 1.68-.537 5.502 2.05A19.181 19.181 0 0120 9.672c1.7.008 3.412.23 5.01.673 3.818-2.587 5.495-2.05 5.495-2.05 1.088 2.755.403 4.79.197 5.293 1.283 1.4 2.058 3.185 2.058 5.369 0 7.681-4.678 9.373-9.132 9.868.717.62 1.372 1.837 1.372 3.703v5.489c0 .531.32 1.156 1.335.96C34.277 36.328 40 28.833 40 20 40 8.955 31.045 0 20 0z"
        fill={fill}
      />
    </svg>
  );
}

export default Github;
