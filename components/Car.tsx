import React from "react";
import { Coordinates, cosDeg, sinDeg, timesScalar, add, minus } from "../utils";
import {
  LENGTH,
  LENGTH_BD,
  WHEEL_LENGTH,
  WHEEL_WIDTH,
  WIDTH,
} from "../utils/parameters";
import { Rectangle } from "./Rectangle";

export const Car: React.FC<{
  OE: Coordinates;
  OF: Coordinates;
  thetaWheels?: number;
  theta: number;
}> = ({ OE, OF, thetaWheels = 0, theta }) => {
  const CAR_PERP = {
    x: -WIDTH * sinDeg(theta),
    y: WIDTH * cosDeg(theta),
  };

  const BD = {
    x: LENGTH_BD * cosDeg(theta),
    y: LENGTH_BD * sinDeg(theta),
  };

  const OD = add(OF, timesScalar(CAR_PERP, -1 / 2));

  const OB = add(OD, minus(BD));

  const OC = add(OE, timesScalar(CAR_PERP, -1 / 2));

  //Wheels
  const rearWheelVect = {
    x: WHEEL_LENGTH * cosDeg(theta),
    y: WHEEL_LENGTH * sinDeg(theta),
  };
  const rearWheelPerpVect = {
    x: -WHEEL_WIDTH * sinDeg(theta),
    y: WHEEL_WIDTH * cosDeg(theta),
  };

  const O_RR = add(OD, timesScalar(rearWheelVect, -1 / 2));
  const O_RL = add(
    OF,
    timesScalar(CAR_PERP, 1 / 2),
    timesScalar(rearWheelVect, -1 / 2),
    minus(rearWheelPerpVect)
  );

  const frontWheelVect = {
    x: WHEEL_LENGTH * cosDeg(theta + thetaWheels),
    y: WHEEL_LENGTH * sinDeg(theta + thetaWheels),
  };
  const frontWheelPerpVect = {
    x: -WHEEL_WIDTH * sinDeg(theta + thetaWheels),
    y: WHEEL_WIDTH * cosDeg(theta + thetaWheels),
  };

  const O_FR = add(OC, timesScalar(frontWheelVect, -1 / 2));
  const O_FL = add(
    OE,
    timesScalar(CAR_PERP, 1 / 2),
    timesScalar(frontWheelVect, -1 / 2),
    minus(frontWheelPerpVect)
  );

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
