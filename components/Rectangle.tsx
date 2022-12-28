import React from "react";
import { cosDeg, sinDeg, Vector } from "../utils";

export const Rectangle: React.FC<{
  point: Vector;
  l1: number;
  l2: number;
  theta?: number;
}> = ({ point, l1, l2, theta = 0 }) => {
  return (
    <>
      <line
        x1={point.x}
        y1={point.y}
        x2={point.x + l1 * cosDeg(theta)}
        y2={point.y + l1 * sinDeg(theta)}
        stroke="black"
      />
      <line
        x1={point.x}
        y1={point.y}
        x2={point.x - l2 * sinDeg(theta)}
        y2={point.y + l2 * cosDeg(theta)}
        stroke="black"
      />
      <line
        x1={point.x + l1 * cosDeg(theta)}
        y1={point.y + l1 * sinDeg(theta)}
        x2={point.x + l1 * cosDeg(theta) - l2 * sinDeg(theta)}
        y2={point.y + l1 * sinDeg(theta) + l2 * cosDeg(theta)}
        stroke="black"
      />
      <line
        x1={point.x - l2 * sinDeg(theta)}
        y1={point.y + l2 * cosDeg(theta)}
        x2={point.x + l1 * cosDeg(theta) - l2 * sinDeg(theta)}
        y2={point.y + l1 * sinDeg(theta) + l2 * cosDeg(theta)}
        stroke="black"
      />
    </>
  );
};
