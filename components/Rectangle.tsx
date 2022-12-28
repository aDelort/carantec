import React from "react";
import { cosDeg, sinDeg } from "../utils";

type Params = {
  x: number;
  y: number;
  l1: number;
  l2: number;
  theta?: number;
};

export const Rectangle: React.FC<{ rectangle: Params }> = ({ rectangle }) => {
  const { theta = 0 } = rectangle;

  return (
    <>
      <line
        x1={rectangle.x}
        y1={rectangle.y}
        x2={rectangle.x + rectangle.l1 * cosDeg(theta)}
        y2={rectangle.y + rectangle.l1 * sinDeg(theta)}
        stroke="black"
      />
      <line
        x1={rectangle.x}
        y1={rectangle.y}
        x2={rectangle.x - rectangle.l2 * sinDeg(theta)}
        y2={rectangle.y + rectangle.l2 * cosDeg(theta)}
        stroke="black"
      />
      <line
        x1={rectangle.x + rectangle.l1 * cosDeg(theta)}
        y1={rectangle.y + rectangle.l1 * sinDeg(theta)}
        x2={
          rectangle.x +
          rectangle.l1 * cosDeg(theta) -
          rectangle.l2 * sinDeg(theta)
        }
        y2={
          rectangle.y +
          rectangle.l1 * sinDeg(theta) +
          rectangle.l2 * cosDeg(theta)
        }
        stroke="black"
      />
      <line
        x1={rectangle.x - rectangle.l2 * sinDeg(theta)}
        y1={rectangle.y + rectangle.l2 * cosDeg(theta)}
        x2={
          rectangle.x +
          rectangle.l1 * cosDeg(theta) -
          rectangle.l2 * sinDeg(theta)
        }
        y2={
          rectangle.y +
          rectangle.l1 * sinDeg(theta) +
          rectangle.l2 * cosDeg(theta)
        }
        stroke="black"
      />
    </>
  );
};
