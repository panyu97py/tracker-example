import { DatePicker, Statistic } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { Chart } from './chart';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router';
import { eventConfigService } from '@/service';

export const EventDataTrend = () => {

  const { id: eventId } = useParams<any>();  // 获取 URL 中的 id 参数

  const [countData, setCountData] = React.useState({ pvCount: 0, uvCount: 0 });

  const [trendData, setTrendData] = React.useState([]);
  //
  const [timeRange, setTimeRange] = React.useState<any>([dayjs().subtract(10,'minute'),dayjs()]);

  const fetchTrendData = async () => {
    const [startTime, endTime] = timeRange;
    const params = { eventId, startTimestamp: startTime.valueOf(), endTimestamp: endTime.valueOf() };
    const res = await eventConfigService.fetchEventDataTrendData(params);
    setTrendData(res);
  };

  const fetchCountData = async () => {
    const res = await eventConfigService.fetchEventDataCount({ eventId });
    setCountData(res);
  }

  useEffect(() => {
    fetchCountData();
  }, []);

  useEffect(() => {
    fetchTrendData();
  }, [timeRange]);

  return (
    <ProCard ghost direction="column" gutter={[16, 16]}>
      <ProCard title="今日数据" style={{ textAlign: 'center' }}>
        <ProCard ghost>
          <Statistic title="上报次数（PV）" value={countData.pvCount} />
        </ProCard>
        <ProCard ghost>
          <Statistic title="上报次数（UV）" value={countData.uvCount} />
        </ProCard>
      </ProCard>
      <ProCard title="上报统计" extra={<DatePicker.RangePicker showTime value={timeRange} onChange={setTimeRange} />}>
        <Chart data={trendData} />
      </ProCard>
    </ProCard>
  );
};
