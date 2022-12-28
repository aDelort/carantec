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
  thetaA?: number;
  thetaB: number;
}> = ({ OE, OF, thetaA = 0, thetaB }) => {
  const CAR_PERP = {
    x: -WIDTH * sinDeg(thetaB),
    y: WIDTH * cosDeg(thetaB),
  };

  const BD = {
    x: LENGTH_BD * cosDeg(thetaB),
    y: LENGTH_BD * sinDeg(thetaB),
  };

  const OD = add(OF, timesScalar(CAR_PERP, -1 / 2));

  const OB = add(OD, minus(BD));

  const OC = add(OE, timesScalar(CAR_PERP, -1 / 2));

  //Wheels
  const rearWheelVect = {
    x: WHEEL_LENGTH * cosDeg(thetaB),
    y: WHEEL_LENGTH * sinDeg(thetaB),
  };
  const rearWheelPerpVect = {
    x: -WHEEL_WIDTH * sinDeg(thetaB),
    y: WHEEL_WIDTH * cosDeg(thetaB),
  };

  const O_RR = add(OD, timesScalar(rearWheelVect, -1 / 2));
  const O_RL = add(
    OF,
    timesScalar(CAR_PERP, 1 / 2),
    timesScalar(rearWheelVect, -1 / 2),
    minus(rearWheelPerpVect)
  );

  const frontWheelVect = {
    x: WHEEL_LENGTH * cosDeg(thetaA),
    y: WHEEL_LENGTH * sinDeg(thetaA),
  };
  const frontWheelPerpVect = {
    x: -WHEEL_WIDTH * sinDeg(thetaA),
    y: WHEEL_WIDTH * cosDeg(thetaA),
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
          theta: thetaB,
        }}
      />
      {/* Rear wheels */}
      <Rectangle
        rectangle={{
          x: O_RR.x,
          y: O_RR.y,
          l1: WHEEL_LENGTH,
          l2: WHEEL_WIDTH,
          theta: thetaB,
        }}
      />
      <Rectangle
        rectangle={{
          x: O_RL.x,
          y: O_RL.y,
          l1: WHEEL_LENGTH,
          l2: WHEEL_WIDTH,
          theta: thetaB,
        }}
      />
      {/* Front wheels */}
      <Rectangle
        rectangle={{
          x: O_FR.x,
          y: O_FR.y,
          l1: WHEEL_LENGTH,
          l2: WHEEL_WIDTH,
          theta: thetaA,
        }}
      />
      <Rectangle
        rectangle={{
          x: O_FL.x,
          y: O_FL.y,
          l1: WHEEL_LENGTH,
          l2: WHEEL_WIDTH,
          theta: thetaA,
        }}
      />
    </>
  );
};
