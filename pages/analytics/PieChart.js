import React from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
  Legend
} from 'recharts'
import Smooth from 'react-smooth'

const RADIAN = Math.PI / 180

const renderActiveShape = props => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props
  return (
    <g>
      <Smooth
        duration={500}
        from={{ radius: outerRadius }}
        to={{ radius: outerRadius + 10 }}>
        {({ radius }) => (
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={radius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
        )}
      </Smooth>
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 8}
        outerRadius={innerRadius - 6}
        fill={fill}
      />
    </g>
  )
}

const renderCustomizedLabel = props => {
  const { cx, cy, midAngle, innerRadius, outerRadius, payload } = props
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5 - 5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central">
      {payload.value}
    </text>
  )
}

class CustomPieChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { activeIndex: 0 }
  }

  onPieEnter(data, index) {
    this.setState({
      activeIndex: index
    })
  }

  render() {
    const { data } = this.props
    const COLORS = ['#de56df', '#566cdf', '#2e6eba', '#337dd5']
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <Legend verticalAlign="bottom" iconType="circle" />
          <Pie
            onMouseEnter={this.onPieEnter.bind(this)}
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            dataKey="value"
            nameKey="channel"
            innerRadius="55%"
            outerRadius="85%"
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            isAnimationActive={false}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    )
  }
}
export default CustomPieChart
