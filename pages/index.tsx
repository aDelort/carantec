import { Slider } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";

type Rectangle = {
  x: number;
  y: number;
  w: number;
  h: number;
  theta?: number;
};

type Options = {
  rectangle: Rectangle;
  fill: boolean;
};

const drawRectangle = (
  ctx: CanvasRenderingContext2D,
  { rectangle: { x, y, w, h, theta }, fill }: Options
) => {
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  if (fill) {
    ctx.fillRect(x, y, w, h);
  } else {
    ctx.strokeRect(x, y, w, h);
  }
};

export const Rectangle: React.FC<{ canvasRef: any; options: Options }> = ({
  canvasRef,
  options,
}) => {
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")!;

      drawRectangle(ctx, options);
      drawRectangle(ctx);
      drawRectangle(ctx);
    }
  }, [theta]);

  return (
   
  );
};

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [theta, setTheta] = useState(0);

  return (
    <Stack direction="row" alignItems="center" spacing={6}>
   
    <canvas
      ref={canvasRef}
      width="1000"
      height="800"
      style={{ border: "1px solid black" }}
      >
      <Rectangle
        canvasRef={canvasRef}
        options={{
          rectangle: { x: 990, y: 0, w: 10, h: 200 },
          fill: true,
        }}
        />
      <Rectangle
        canvasRef={canvasRef}
        options={{
          rectangle: { x: 800, y: 0, w: 10, h: 200 },
          fill: true,
        }}
      />
      <Rectangle
        canvasRef={canvasRef}
        options={{
          rectangle: { x: 600, y: 300, w: 100, h: 100 + theta, theta },
          fill: false,
        }}
        />
    </canvas>
    <Box width="250px">
      <Slider
        value={theta}
        onChange={(_e, newValue) =>
          setTheta((value) => {
            // value as number;
            // ctx.clearRect(600, 300, 100, 100 + value);
            return newValue as number;
          })
        }
        min={0}
        max={90}
      />
    </Box>
        </Stack>
  );
}
