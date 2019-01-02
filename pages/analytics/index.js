import React from 'react'
import moment from 'moment'
import Jumbotron from '../../elements/jumbotron'
import Widget from '../../elements/Widget'
import LineChart from './LineChart'
import BarChart from './BarChart'
import PieChart from './PieChart'
import UserLineChart from './UserLineChart'
import ChannelScatterChart from './ScatterChart'
import RecentQuery from './RecentQuery'

const sampleData = {
  totalHits: [
    { date: '2018-06-19', count: 4000 },
    { date: '2018-06-18', count: 3000 },
    { date: '2018-06-17', count: 2000 },
    { date: '2018-06-16', count: 2780 },
    { date: '2018-06-15', count: 1890 },
    { date: '2018-06-14', count: 2390 },
    { date: '2018-06-13', count: 3490 }
  ],
  newUsers: [
    { date: '2018-06-19', count: 2400 },
    { date: '2018-06-18', count: 1398 },
    { date: '2018-06-17', count: 9800 },
    { date: '2018-06-16', count: 3908 },
    { date: '2018-06-15', count: 4800 },
    { date: '2018-06-14', count: 3800 },
    { date: '2018-06-13', count: 4300 }
  ],
  uniqueUsers: [
    { date: '2018-06-19', count: 4000 },
    { date: '2018-06-18', count: 3000 },
    { date: '2018-06-17', count: 2000 },
    { date: '2018-06-16', count: 2780 },
    { date: '2018-06-15', count: 1890 },
    { date: '2018-06-14', count: 2390 },
    { date: '2018-06-13', count: 3490 }
  ],
  channels: [
    {
      date: moment('2018-06-15').unix(),
      value: [
        { channel: 'facebook', value: 45 },
        { channel: 'twitter', value: 22 },
        { channel: 'instagram', value: 45 },
        { channel: 'linkedin', value: 60 }
      ]
    },
    {
      date: moment('2018-06-14').unix(),
      value: [
        { channel: 'facebook', value: 75 },
        { channel: 'twitter', value: 25 },
        { channel: 'instagram', value: 10 },
        { channel: 'linkedin', value: 60 }
      ]
    },
    {
      date: moment('2018-06-13').unix(),
      value: [
        { channel: 'facebook', value: 35 },
        { channel: 'twitter', value: 231 },
        { channel: 'instagram', value: 88 },
        { channel: 'linkedin', value: 11 }
      ]
    }
  ],
  accuracy: [
    { date: '2018-06-19', count: 4000 },
    { date: '2018-06-18', count: 3000 },
    { date: '2018-06-17', count: 2000 },
    { date: '2018-06-16', count: 2780 },
    { date: '2018-06-15', count: 1890 },
    { date: '2018-06-14', count: 2390 },
    { date: '2018-06-13', count: 3490 }
  ],
  recentQueries: [
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    },
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    },
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    },
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    },
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    },
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    },
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    },
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    },
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    },
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    },
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    },
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    },
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    },
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    },
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    },
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    },
    {
      query: "what's neft?",
      userId: 0,
      intent: 'FAQ',
      timestamp: moment('2018-06-15 13:00:21').format('Do MMM YYYY, h:mm a')
    }
  ]
}
class AnalyticsPage extends React.Component {
  constructor(props) {
    super(props)
    this.navInfo = [{ url: '/analytics', title: 'Analytics' }]
  }

  render() {
    const userChartData = [
      { date: '2018-06-19', newUser: 2400, totalUser: 4000 },
      { date: '2018-06-18', newUser: 1398, totalUser: 3000 },
      { date: '2018-06-17', newUser: 9800, totalUser: 2000 },
      { date: '2018-06-16', newUser: 3908, totalUser: 2780 },
      { date: '2018-06-15', newUser: 4800, totalUser: 1890 },
      { date: '2018-06-14', newUser: 3800, totalUser: 2390 },
      { date: '2018-06-13', newUser: 4300, totalUser: 3490 }
    ]
    return (
      <div className="page analytics-page">
        <Jumbotron navInfo={this.navInfo} />
        <div className="page-content">
          <div className="header">
            <div className="title">
              <h3>Analytics</h3>
            </div>
          </div>
          <div className="btn-period-group mb-4">
            <button className="btn-period">Daily</button>
            <button className="btn-period">Weekly</button>
            <button className="btn-period">Monthly</button>
            <button className="btn-period">Range</button>
          </div>
          <div className="row mb-4">
            <div className="col-sm-6 col-md-3">
              <div className="today-stats today-hits">
                <div className="stats-container">
                  <div className="stats-number">28285</div>
                  <div className="stats-chart">
                    <LineChart
                      data={sampleData.totalHits}
                      stroke="#e76d3a"
                      key="count"
                      thickness="2"
                    />
                  </div>
                </div>
                <label>Total Hits Today</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="today-stats today-new-user">
                <div className="stats-container">
                  <div className="stats-number">100</div>
                  <div className="stats-chart">
                    <LineChart
                      data={sampleData.newUsers}
                      stroke="#84b547"
                      key="count"
                      thickness="2"
                    />
                  </div>
                </div>
                <label>New Users Today</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="today-stats today-total-user">
                <div className="stats-container">
                  <div className="stats-number">100</div>
                  <div className="stats-chart">
                    <LineChart
                      data={sampleData.uniqueUsers}
                      stroke="#de56df"
                      key="count"
                      thickness="2"
                    />
                  </div>
                </div>
                <label>Total Users Today</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="today-stats today-accuracy">
                <div className="stats-container">
                  <div className="stats-number">120</div>
                  <div className="stats-chart">
                    <BarChart
                      data={sampleData.accuracy}
                      stroke="#566cdf"
                      key="count"
                      thickness="2"
                    />
                  </div>
                </div>
                <label>Total Accuracy Today</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Widget title="Number of hits" description="" isRounded={true}>
                <div className="row m-b-20">
                  <div className="col">
                    <div className="chart-container">
                      <LineChart
                        syncId="user"
                        data={sampleData.totalHits}
                        withAxis={true}
                        withGrid={true}
                        withTooltip={true}
                        stroke="#e76d3a"
                        thickness="4"
                      />
                    </div>
                  </div>
                </div>
              </Widget>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Widget title="Users" description="" isRounded={true}>
                <div className="row m-b-20">
                  <div className="col">
                    <div className="chart-container">
                      <UserLineChart syncId="user" data={userChartData} />
                    </div>
                  </div>
                </div>
              </Widget>
            </div>
            <div className="col">
              <Widget title="Accuracy" description="" isRounded={true}>
                <div className="row m-b-20">
                  <div className="col">
                    <div className="chart-container">
                      <BarChart
                        syncId="user"
                        data={sampleData.accuracy}
                        withAxis={true}
                        withGrid={true}
                        withTooltip={true}
                        stroke="#566cdf"
                        key="count"
                        thickness="2"
                      />
                    </div>
                  </div>
                </div>
              </Widget>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Widget title="Intents" description="" isRounded={true}>
                <div className="row m-b-20">
                  <div className="col">
                    <div className="chart-container">
                      <PieChart data={sampleData.channels[0].value} />
                    </div>
                  </div>
                </div>
              </Widget>
            </div>
            <div className="col">
              <Widget title="Intents" description="" isRounded={true}>
                <div className="row m-b-20">
                  <div className="col">
                    <div className="chart-container">
                      <PieChart data={sampleData.channels[1].value} />
                    </div>
                  </div>
                </div>
              </Widget>
            </div>
            <div className="col">
              <Widget title="Intents" description="" isRounded={true}>
                <div className="row m-b-20">
                  <div className="col">
                    <div className="chart-container">
                      <PieChart data={sampleData.channels[2].value} />
                    </div>
                  </div>
                </div>
              </Widget>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Widget title="Channels" description="" isRounded={true}>
                <div className="row m-b-20">
                  <div className="col">
                    <div className="chart-container">
                      <ChannelScatterChart
                        data={sampleData.channels[0]}
                        dataKeys={[
                          'facebook',
                          'twitter',
                          'instagram',
                          'linkedin'
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </Widget>
            </div>
            <div className="col">
              <Widget title="Channels" description="" isRounded={true}>
                <div className="row m-b-20">
                  <div className="col">
                    <div className="chart-container">
                      <ChannelScatterChart
                        data={sampleData.channels[1]}
                        dataKeys={[
                          'facebook',
                          'twitter',
                          'instagram',
                          'linkedin'
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </Widget>
            </div>
            <div className="col">
              <Widget title="Channels" description="" isRounded={true}>
                <div className="row m-b-20">
                  <div className="col">
                    <div className="chart-container">
                      <ChannelScatterChart
                        data={sampleData.channels[2]}
                        dataKeys={[
                          'facebook',
                          'twitter',
                          'instagram',
                          'linkedin'
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </Widget>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Widget title="Recent queries" description="" isRounded={true}>
                <RecentQuery
                  columns={['query', 'userId', 'intent', 'timestamp']}
                  columnNames={{
                    query: 'Query',
                    userId: 'User ID',
                    intent: 'Indent',
                    timestamp: 'Date/Time'
                  }}
                  items={sampleData.recentQueries}
                />
              </Widget>
            </div>
          </div>
          {/* <span>Loading...</span> */}
        </div>
      </div>
    )
  }
}

export default AnalyticsPage
