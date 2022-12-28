import React from "react";
import { Vector, cosDeg, sinDeg } from "../utils";
import {
  LENGTH,
  LENGTH_BD,
  WHEEL_LENGTH,
  WHEEL_WIDTH,
  WIDTH,
} from "../utils/parameters";
import { Rectangle } from "./Rectangle";

export const Car: React.FC<{
  OE: Vector;
  OF: Vector;
  thetaWheels?: number;
  theta: number;
}> = ({ OE, OF, thetaWheels = 0, theta }) => {
  const CAR_PERP = new Vector(WIDTH * sinDeg(-theta), WIDTH * cosDeg(-theta));

  const BD = new Vector(LENGTH_BD * cosDeg(theta), LENGTH_BD * sinDeg(theta));

  const OD = OF.add(CAR_PERP.times(-1 / 2));

  const OB = OD.add(BD.times(-1));

  const OC = OE.add(CAR_PERP.times(-1 / 2));

  //Wheels
  const rearWheelVect = new Vector(
    WHEEL_LENGTH * cosDeg(theta),
    WHEEL_LENGTH * sinDeg(theta)
  );

  const rearWheelPerpVect = new Vector(
    WHEEL_WIDTH * sinDeg(-theta),
    WHEEL_WIDTH * cosDeg(-theta)
  );

  const O_RR = OD.add(rearWheelVect.times(-1 / 2));
  const O_RL = OF.add(CAR_PERP.times(1 / 2))
    .add(rearWheelVect.times(-1 / 2))
    .add(rearWheelPerpVect.times(-1));

  const frontWheelVect = new Vector(
    WHEEL_LENGTH * cosDeg(theta + thetaWheels),
    WHEEL_LENGTH * sinDeg(theta + thetaWheels)
  );

  const frontWheelPerpVect = new Vector(
    WHEEL_WIDTH * sinDeg(-theta - thetaWheels),
    WHEEL_WIDTH * cosDeg(-theta - thetaWheels)
  );

  const O_FR = OC.add(frontWheelVect.times(-1 / 2));
  const O_FL = OE.add(CAR_PERP.times(1 / 2))
    .add(frontWheelVect.times(-1 / 2))
    .add(frontWheelPerpVect.times(-1));

  return (
    <>
      {/* Car */}
      <Rectangle
        rectangle={{
          x: OB.x,
          y: OB.y,
          l1: LENGTH,
          l2: WIDTH,
          theta: theta,
        }}
      />
      {/* Rear wheels */}
      <Rectangle
        rectangle={{
          x: O_RR.x,
          y: O_RR.y,
          l1: WHEEL_LENGTH,
          l2: WHEEL_WIDTH,
          theta: theta,
        }}
      />
      <Rectangle
        rectangle={{
          x: O_RL.x,
          y: O_RL.y,
          l1: WHEEL_LENGTH,
          l2: WHEEL_WIDTH,
          theta: theta,
        }}
      />
      {/* Front wheels */}
      <Rectangle
        rectangle={{
          x: O_FR.x,
          y: O_FR.y,
          l1: WHEEL_LENGTH,
          l2: WHEEL_WIDTH,
          theta: theta + thetaWheels,
        }}
      />
      <Rectangle
        rectangle={{
          x: O_FL.x,
          y: O_FL.y,
          l1: WHEEL_LENGTH,
          l2: WHEEL_WIDTH,
          theta: theta + thetaWheels,
        }}
      />
    </>
  );
};
