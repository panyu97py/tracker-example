import {Statistic} from "antd";
import {ProCard} from "@ant-design/pro-components";
import {Chart} from "./chart";
import React, {useEffect} from "react";
import {service} from "@/service";
import {useParams} from 'react-router';

export const EventDataTrend = () => {

  const {id} = useParams();  // 获取 URL 中的 id 参数

  const [data, setData] = React.useState<any>({})

  const fetchData = async () => {
    const res = await service.fetchEventDataTrendData({id})
    setData(res)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ProCard ghost direction="column" gutter={[16, 16]}>
      <ProCard title="今日数据" style={{textAlign: 'center'}}>
        <ProCard ghost>
          <Statistic title="上报次数（PV）" value={data.pv} />
        </ProCard>
        <ProCard ghost>
          <Statistic title="上报次数（UV）" value={data.uv} />
        </ProCard>
      </ProCard>

      <ProCard title="上报统计">
        <Chart data={data.trend} />
      </ProCard>
    </ProCard>
  )
}