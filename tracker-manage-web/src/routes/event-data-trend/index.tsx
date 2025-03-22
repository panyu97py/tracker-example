import { DatePicker, Space, Statistic, Switch } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { Chart } from './chart';
import React, { useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router';
import { eventConfigService } from '@/service';
import { generateMockCountData, generateMockTrendData, transformedData } from './utils';

export const EventDataTrend = () => {

  const { id: eventId } = useParams<any>();  // 获取 URL 中的 id 参数

  const [countData, setCountData] = React.useState({ pvCount: 0, uvCount: 0 });

  const [mockSwitch, setMockSwitch] = React.useState(false);

  const [trendData, setTrendData] = React.useState([]);

  const [timeRange, setTimeRange] = React.useState<any>([dayjs().subtract(10, 'minute'), dayjs()]);

  const timeRangeVal = useMemo(() => {
    const [startTime, endTime] = timeRange;
    return { startTimestamp: startTime.valueOf(), endTimestamp: endTime.valueOf() };
  }, [timeRange]);

  const mockCountData = useMemo(() => generateMockCountData(), []);

  const mockTrendData = useMemo(() => generateMockTrendData(timeRangeVal), [timeRangeVal]);

  const fetchTrendData = async () => {
    const params = { eventId, ...timeRangeVal };
    const res = await eventConfigService.fetchEventDataTrendData(params);
    setTrendData(res);
  };

  const fetchCountData = async () => {
    const res = await eventConfigService.fetchEventDataCount({ eventId });
    setCountData(res);
  };

  useEffect(() => {
    fetchCountData();
  }, []);

  useEffect(() => {
    fetchTrendData();
  }, [timeRangeVal]);

  const mockSwitchVNode = (
    <Space>
      <span>mock switch</span>
      <Switch value={mockSwitch} onChange={setMockSwitch} />
    </Space>
  );

  return (
    <ProCard ghost direction="column" gutter={[16, 16]}>
      <ProCard title="今日数据" style={{ textAlign: 'center' }} extra={mockSwitchVNode}>
        <ProCard ghost>
          <Statistic title="上报次数（PV）" value={mockSwitch ? mockCountData.pvCount : countData.pvCount} />
        </ProCard>
        <ProCard ghost>
          <Statistic title="上报次数（UV）" value={mockSwitch ? mockCountData.uvCount : countData.uvCount} />
        </ProCard>
      </ProCard>
      <ProCard title="上报统计" extra={<DatePicker.RangePicker showTime value={timeRange} onChange={setTimeRange} />}>
        <Chart data={transformedData({ data: mockSwitch ? mockTrendData : trendData, ...timeRangeVal })} />
      </ProCard>
    </ProCard>
  );
};
