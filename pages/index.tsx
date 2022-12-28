import { TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import _ from "lodash";
import { Vector, cosDeg, sinDeg } from "../utils";
import { Car } from "../components/Car";
import {
  DELTA_L,
  DELTA_THETA,
  F_init,
  LENGTH,
  LENGTH_AC,
  LENGTH_BD,
  NB_ITERATIONS,
  THETA_INIT,
} from "../utils/parameters";

export default function Home() {
  const [thetaWheels, setThetaA] = useState(0);

  const [OF, setOF] = useState<Vector>(F_init);

  const lengthFE = LENGTH - LENGTH_AC - LENGTH_BD;

  const FE_init = new Vector(
    lengthFE * cosDeg(THETA_INIT),
    lengthFE * sinDeg(-THETA_INIT)
  );

  const [OE, setOE] = useState<Vector>(F_init.add(FE_init));

  const FE = OE.add(OF.times(-1));
  const theta = (Math.asin(FE.y / FE.norm()) * 180) / Math.PI;

  const move = (backwards: boolean): void => {
    const sign = backwards ? -1 : 1;

    const dOE = new Vector(
      cosDeg(theta + thetaWheels),
      sinDeg(theta + thetaWheels)
    ).times(sign * DELTA_L);

    setOE((OE) => OE.add(dOE));

    const dOF = new Vector(cosDeg(theta), sinDeg(theta)).times(
      sign * DELTA_L * cosDeg(thetaWheels)
    );

    setOF((OF) => OF.add(dOF));
  };

  return (
    <Stack direction="row" alignItems="center" spacing={6}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="1100"
        height="800"
        viewBox="0 0 2200 1600"
      >
        <rect
          x="0"
          y="0"
          width="2200"
          height="1600"
          stroke="black"
          fillOpacity="0"
        />
        <rect x="1000" y="0" width="10" height="300" fill="green" />
        <rect x="640" y="0" width="10" height="300" fill="green" />
        <Car OF={OF} OE={OE} thetaWheels={thetaWheels} theta={theta} />
      </svg>

      <Box width="250px">
        <TextField
          value={-thetaWheels}
          onChange={(e) => setThetaA(-parseInt(e.target.value))}
          onKeyDown={(e) => {
            switch (e.code) {
              case "ArrowUp":
                for (let i = 0; i < NB_ITERATIONS; i++) move(false);
                break;
              case "ArrowDown":
                for (let i = 0; i < NB_ITERATIONS; i++) move(true);
                break;
              case "ArrowLeft":
                setThetaA((t) => t - DELTA_THETA);
                break;
              case "ArrowRight":
                setThetaA((t) => t + DELTA_THETA);
                break;
            }
          }}
        />
      </Box>
    </Stack>
  );
}
