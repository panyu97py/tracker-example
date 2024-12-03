import {Card, Col, Row, Statistic} from "antd";
import {Chart} from "./chart";
import React, {useEffect} from "react";
import {service} from "../../service";
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
    <div>
      <Card title="今日数据">
        <Row style={{textAlign: 'center'}}>
          <Col span={12}>
            <Statistic title="上报次数（PV）" value={data.pv}/>
          </Col>
          <Col span={12}>
            <Statistic title="上报次数（UV）" value={data.uv}/>
          </Col>
        </Row>
      </Card>
      <Card title="上报统计">
        <Chart data={data.trend}/>
      </Card>
    </div>
  )
}