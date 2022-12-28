import _ from "lodash";

export const cosDeg = (theta: number): number =>
  Math.cos((theta * Math.PI) / 180);
export const sinDeg = (theta: number): number =>
  Math.sin((theta * Math.PI) / 180);

export type Coordinates = {
  x: number;
  y: number;
};

export const add = (...points: Coordinates[]): Coordinates => ({
  x: _.sum(points.map(({ x }) => x)),
  y: _.sum(points.map(({ y }) => y)),
});

export const minus = (point: Coordinates): Coordinates => ({
  x: -point.x,
  y: -point.y,
});

export const timesScalar = (
  point: Coordinates,
  scalar: number
): Coordinates => ({
  x: scalar * point.x,
  y: scalar * point.y,
});

export const norm = (point: Coordinates): number =>
  Math.sqrt(point.x * point.x + point.y * point.y);
