import React from "react";
import { Move } from "./BlankMove";

interface Props {
  position: number;
}

export const OMove = (props: Props) => {
  return (
    <Move className={`move column${props.position}`}>
      <svg viewBox="0 0 56 56">
        <circle
          cx={28}
          cy={28}
          r={25}
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </Move>
  );
};
