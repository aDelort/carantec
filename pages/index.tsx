import { TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import _ from "lodash";
import {
  Coordinates,
  cosDeg,
  sinDeg,
  timesScalar,
  norm,
  add,
  minus,
} from "../utils";
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

  const [OF, setOF] = useState<Coordinates>(F_init);

  const lengthFE = LENGTH - LENGTH_AC - LENGTH_BD;

  const [OE, setOE] = useState<Coordinates>(
    add(F_init, {
      x: lengthFE * cosDeg(THETA_INIT),
      y: lengthFE * sinDeg(-THETA_INIT),
    })
  );

  const FE = add(OE, minus(OF));
  const theta = (Math.asin(FE.y / norm(FE)) * 180) / Math.PI;

  const move = (backwards: boolean): void => {
    const sign = backwards ? -1 : 1;

    setOE((OE) =>
      add(OE, {
        x: sign * cosDeg(theta + thetaWheels) * DELTA_L,
        y: sign * sinDeg(theta + thetaWheels) * DELTA_L,
      })
    );
    setOF((OF) =>
      add(
        OF,
        timesScalar(
          {
            x: sign * cosDeg(theta) * DELTA_L,
            y: sign * sinDeg(theta) * DELTA_L,
          },
          cosDeg(thetaWheels)
        )
      )
    );
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
