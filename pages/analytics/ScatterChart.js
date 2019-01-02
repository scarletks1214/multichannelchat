import React from 'react'
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  // Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import moment from 'moment'

const COLORS = ['#de56df', '#566cdf', '#84b547', '#337dd5']

const ChannelScatterChart = ({ data, dataKeys }) => (
  <ResponsiveContainer width="100%" height="100%">
    <ScatterChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
      <XAxis
        dataKey="date"
        tickLine={false}
        stroke="#e7ebef"
        strokeWidth="1"
        tick={{ fill: '#4d4d4d' }}
        padding={{ left: 30, right: 30 }}
        type="number"
        tickFormatter={unixTime => moment.unix(unixTime).format('Do MMM YY')}
        ticks={[data.date]}
        domain={['dataMin - 86400', 'dataMax + 86400']}
        interval={0}
      />
      <YAxis tickLine={false} axisLine={false} dataKey="value" />}
      <CartesianGrid vertical={false} stroke="#e7ebef" />
      <Tooltip />
      <Legend />
      {data.value.map(({ channel, value }, index) => (
        <Scatter
          data={[
            {
              date: data.date,
              value
            }
          ]}
          name={channel}
          fill={COLORS[index]}
          key={index}
        />
      ))}
    </ScatterChart>
  </ResponsiveContainer>
)
export default ChannelScatterChart
