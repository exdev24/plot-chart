import React from 'react';
import {
  VictoryChart,
  VictoryArea,
  VictoryTheme,
  VictoryAxis,
  VictoryContainer,
  VictoryScatter,
  VictoryLine,
  VictoryLegend
} from 'victory';

const PAST_COLOR = '#b1b1fe';
const FUTURE_COLOR = '#b1fefe';

export default function Chat({ width, height, pastData, futureData }) {
  return (
    <VictoryChart
      minDomain={{ x: 0 }}
      height={height}
      width={width}
      theme={VictoryTheme.material}
      containerComponent={<VictoryContainer responsive={false} />}
    >
      {/* Main Axis */}
      <VictoryAxis tickCount={9} />
      <VictoryAxis dependentAxis tickValues={[0,1,2,3,4,5,6,7,8,9]} />

      {/* Top and Right Borders */}
      <VictoryAxis orientation="top" tickCount={9} style={{ tickLabels: { display: 'none' } }} />
      <VictoryAxis dependentAxis orientation="right" style={{ tickLabels: { display: 'none' } }} />

      {/* Display Chart for Past Data */}
      <VictoryArea
        style={{ data: { fill: PAST_COLOR, stroke: "blue", strokeWidth: 1, strokeLinecap: "round" } }}
        interpolation="natural"
        data={pastData}
      />
      <VictoryScatter
        style={{ data: { fill: "black" } }}
        size={3}
        data={pastData.map(data => ({
          x: data.x,
          y: data.y0
        }))}
      />

      {/* Display Chart for Future Data */}
      <VictoryArea
        style={{ data: { fill: FUTURE_COLOR } }}
        interpolation="natural"
        data={futureData}
      />
       <VictoryLine
        style={{
          data: { stroke: "black", strokeDasharray: 6 },
        }}
        data={futureData.map(data => ({
          x: data.x,
          y: data.y0
        }))}
      />

      {/* Legend */}
      {/* ToDo: Calculate position correctly. Currently it is set by manually. */}
      <VictoryLegend x={width - 250} y={height - 180}
        orientation="vertical"
        gutter={20}
        style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
        data={[
          { name: "MONTHLY DATA", symbol: { fill: "black" } },
          { name: "FORECAST", symbol: { fill: "black", type: 'minus' } },
          { name: "ACCEPTABLE INCREASE", symbol: { fill: PAST_COLOR, type: 'square' } },
          { name: "FORECAST ACCEPTABLE", symbol: { fill: FUTURE_COLOR, type: 'square' } },
        ]}
      />
    </VictoryChart>
  );
};
