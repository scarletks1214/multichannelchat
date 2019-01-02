import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

const OneLineChart = ({
  syncId,
  data,
  withAxis,
  withTooltip,
  withLegend,
  withGrid,
  stroke,
  thickness
}) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart
      data={data}
      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
      syncId={syncId}>
      {withAxis && (
        <XAxis
          dataKey="date"
          tickLine={false}
          stroke="#e7ebef"
          strokeWidth="1"
          tick={{ fill: '#4d4d4d' }}
          padding={{ left: 30, right: 30 }}
        />
      )}
      {withAxis && <YAxis tickLine={false} axisLine={false} />}

      {withGrid && <CartesianGrid vertical={false} stroke="#e7ebef" />}
      {withTooltip && <Tooltip />}
      {withLegend && <Legend />}
      <Line
        type="monotone"
        dataKey="count"
        stroke={stroke}
        strokeWidth={thickness || 1}
        dot={{ fill: '#44cfff', stroke: '#44cfff', r: 2 }}
        activeDot={{ r: 5 }}
      />
    </LineChart>
  </ResponsiveContainer>
)
export default OneLineChart
