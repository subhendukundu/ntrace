import React from "react";

function CustomDot(props) {
  const { cx, cy, index, length, color, radius = 3 } = props;

  return index === length ? (
    <svg
      height={4 * radius}
      width={4 * radius}
      x={cx - 2 * radius}
      y={cy - 2 * radius}
    >
      <circle cx={2 * radius} cy={2 * radius} r={radius} fill={color} />
    </svg>
  ) : null;
}

export default CustomDot;
