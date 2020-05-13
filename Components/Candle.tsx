import React from 'react';
import { ScaleLinear } from 'd3-scale';
import { Line, Rect } from 'react-native-svg';

export interface CandleMode {
  date: string;
  day: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandleProps {
  candle: CandleMode;
  caliber: number;
  scaleY: ScaleLinear<number, number>;
  scaleBody: ScaleLinear<number, number>;
  index: number;
}
const MARGIN = 4;
export default ({
  candle: { high, low, open, close },
  index,
  caliber,
  scaleY,
  scaleBody,
}: CandleProps) => {
  const x = caliber * index + 0.5 * caliber;
  const color = open > close ? '#4AFA9A' : '#E33F64';
  return (
    <>
      <Line
        x1={x}
        x2={x}
        y1={scaleY(high)}
        y2={scaleY(low)}
        stroke={color}
        strokeWidth={1}
      />
      <Rect
        x={caliber * index + MARGIN}
        y={scaleY(Math.max(open, close))}
        width={caliber - MARGIN}
        height={
          scaleBody(Math.max(open, close)) - scaleBody(Math.min(open, close))
        }
        fill={color}
      />
    </>
  );
};
