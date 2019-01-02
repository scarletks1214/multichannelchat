import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

const CustomBarChart = ({
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
    <BarChart
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
      <Bar dataKey="count" fill={stroke} />
    </BarChart>
  </ResponsiveContainer>
)
export default CustomBarChart
