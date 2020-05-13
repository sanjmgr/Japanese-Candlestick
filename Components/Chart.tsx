import React from 'react';
import Svg from 'react-native-svg';
import { scaleLinear } from 'd3-scale';
import Candle, { CandleMode } from './Candle';
interface ChartProps {
  candles: CandleMode[];
  caliber: number;
  size: number;
  domain: number[];
}
export default ({ candles, caliber, size, domain }: ChartProps) => {
  const scaleY = scaleLinear().domain(domain).range([size, 0]);
  const scaleBody = scaleLinear()
    .domain([0, domain[1] - domain[0]])
    .range([0, size]);
  return (
    <Svg width={size} height={size}>
      {candles.map((candle, index) => (
        <Candle
          key={index}
          {...{ candle, caliber, scaleY, scaleBody, index }}
        />
      ))}
    </Svg>
  );
};
