import React from "react";

interface Props {
  addMove: () => void;
}

export const Move = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return <div onClick={props.onClick} {...props}></div>
}

export const BlankMove = ({ addMove }: Props) => {
  return <Move className="move" onClick={() => addMove()}></Move>;
};
