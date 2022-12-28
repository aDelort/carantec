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

  times(scalar: number): Vector {
    return new Vector(scalar * this.x, scalar * this.y);
  }

  norm(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
