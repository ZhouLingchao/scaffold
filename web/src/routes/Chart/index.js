import React, { PureComponent } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { connect } from 'dva';

@connect(({ chart }) => ({ chart }))
export default class TemperatureChart extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetch',
    });
  }
  render() {
    const { chart: { data } } = this.props;
    console.log(data);

    const cols = {
      'time': {
        alias: '时间',
      },
      'value': {
        min: 0,
        alias: '温度',
        formatter: (val) => { return `${val}°C` }
      },
    }
    return (
      <div style={{ background: '#fff' }} >
        <Chart data={data} scale={cols} forceFit>
          <Axis name="time" />
          <Axis name="value" />
          <Tooltip />
          <Geom type="line" position="time*value" size={2} />
          <Geom type='point' position="time*value" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1 }} />
        </Chart>
      </ div>
    );
  }
}
