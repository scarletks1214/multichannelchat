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

const UserLineChart = ({ syncId, data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart
      data={data}
      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
      syncId={syncId}>
      <CartesianGrid vertical={false} stroke="#e7ebef" />
      <XAxis
        dataKey="date"
        tickLine={false}
        stroke="#e7ebef"
        strokeWidth="1"
        tick={{ fill: '#4d4d4d' }}
        padding={{ left: 30, right: 30 }}
      />
      <YAxis tickLine={false} axisLine={false} />
      <Tooltip />
      <Legend verticalAlign="top" align="right" iconType="circle" height={36} />
      <Line
        type="monotone"
        dataKey="newUser"
        stroke={'#84b547'}
        strokeWidth="4"
        dot={{ fill: '#44cfff', stroke: '#44cfff', r: 2 }}
        activeDot={{ r: 5 }}
      />
      <Line
        type="monotone"
        dataKey="totalUser"
        stroke={'#de56df'}
        strokeWidth="4"
        dot={{ fill: '#44cfff', stroke: '#44cfff', r: 2 }}
        activeDot={{ r: 5 }}
      />
    </LineChart>
  </ResponsiveContainer>
)
export default UserLineChart
