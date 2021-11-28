import React, { memo } from "react";

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={512}
      height={512}
      viewBox="0 0 512 512"
      {...props}
    >
      <g xmlns="http://www.w3.org/2000/svg">
        <path
          d="M447 117H256l-10.667 139L256 395h191c35.841 0 65-29.159 65-65V182c0-35.841-29.159-65-65-65z"
          fill="#007bff"
          data-original="#59c36a"
        />
        <path
          d="M65 117c-35.841 0-65 29.159-65 65v148c0 35.841 29.159 65 65 65h191V117z"
          fill="#201aa2dd"
          data-original="#97de3d"
        />
        <path
          d="M392.599 183.973l-28.206 43.329-28.293-43.329h-35.828l49.129 75.241-.169 68.746 30 .073.169-68.796 48.995-75.264z"
          fill="#eaf1ff"
          data-original="#eaf1ff"
        />
        <path
          d="M195.539 231.172c0-26.009-21.442-47.169-47.799-47.169H101v143.993h30V278.4a4045.66 4045.66 0 0116.74-.059c26.357 0 47.799-21.16 47.799-47.169zm-64.46 0c0-3.393-.017-10.495-.035-17.169h16.696c9.648 0 17.799 7.862 17.799 17.169s-8.15 17.169-17.799 17.169c-3.869 0-10.445.028-16.602.058-.031-6.384-.059-13.262-.059-17.227z"
          fill="#f9f9f9"
          data-original="#f9f9f9"
        />
        <g>
          <path
            d="M268.956 184H256l-4.666 26.003L256 235.385l.142-.372 12.601 33.392H256L251.334 284 256 298.405h24.065l11.141 29.521h32.065z"
            fill="#eaf1ff"
            data-original="#eaf1ff"
          />
          <path
            d="M243.424 268.405L256 235.385V184h-12.531l-54.816 143.926h32.102l11.243-29.521H256v-30z"
            fill="#f9f9f9"
            data-original="#f9f9f9"
          />
        </g>
      </g>
    </svg>
  );
}

const PayAsYouGo = React.memo(SvgComponent);
export default PayAsYouGo;
