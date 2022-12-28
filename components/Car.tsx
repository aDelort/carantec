import React from "react";
import { cosDeg, sinDeg } from "../utils";
import {
  LENGTH,
  LENGTH_BD,
  WHEEL_LENGTH,
  WHEEL_WIDTH,
  WIDTH,
} from "../utils/parameters";
import { Vector } from "../utils/vector";
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
      <Rectangle point={OB} l1={LENGTH} l2={WIDTH} theta={theta} />

      {/* Rear wheels */}
      <Rectangle
        point={O_RR}
        l1={WHEEL_LENGTH}
        l2={WHEEL_WIDTH}
        theta={theta}
      />
      <Rectangle
        point={O_RL}
        l1={WHEEL_LENGTH}
        l2={WHEEL_WIDTH}
        theta={theta}
      />

      {/* Front wheels */}
      <Rectangle
        point={O_FR}
        l1={WHEEL_LENGTH}
        l2={WHEEL_WIDTH}
        theta={theta + thetaWheels}
      />
      <Rectangle
        point={O_FL}
        l1={WHEEL_LENGTH}
        l2={WHEEL_WIDTH}
        theta={theta + thetaWheels}
      />
    </>
  );
};
