import _ from "lodash";

export const cosDeg = (theta: number): number =>
  Math.cos((theta * Math.PI) / 180);
export const sinDeg = (theta: number): number =>
  Math.sin((theta * Math.PI) / 180);

export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(point: Vector): Vector {
    return new Vector(this.x + point.x, this.y + point.y);
  }

  // "-"(point1: Vector, point2: Vector): Vector {
  //   return new Vector(point1.x - point2.x, point2.y - point2.y);
  // }

  times(scalar: number): Vector {
    return new Vector(scalar * this.x, scalar * this.y);
  }

  norm(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
