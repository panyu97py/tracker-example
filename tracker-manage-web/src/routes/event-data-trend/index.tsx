import {Statistic} from "antd";
import {ProCard} from "@ant-design/pro-components";
import {Chart} from "./chart";
import React, {useEffect} from "react";
import {useParams} from 'react-router';
import moment from 'moment';
import { eventConfigService } from '@/service';

export const EventDataTrend = () => {

  const {id:eventId} = useParams<any>();  // 获取 URL 中的 id 参数

  const [data, setData] = React.useState<any>({})

  const fetchData = async () => {
    const startTimestamp = moment().startOf('day').valueOf()
    const endTimestamp = moment().endOf('day').valueOf()
    const params = {eventId, startTimestamp, endTimestamp}
    const res = await eventConfigService.fetchEventDataTrendData(params)
    setData(res)
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <ProCard ghost direction="column" gutter={[16, 16]}>
      <ProCard title="今日数据" style={{textAlign: 'center'}}>
        <ProCard ghost>
          <Statistic title="上报次数（PV）" value={data.pvCount} />
        </ProCard>
        <ProCard ghost>
          <Statistic title="上报次数（UV）" value={data.uvCount} />
        </ProCard>
      </ProCard>

      <ProCard title="上报统计">
        <Chart data={data.trend} />
      </ProCard>
    </ProCard>
  )
}
