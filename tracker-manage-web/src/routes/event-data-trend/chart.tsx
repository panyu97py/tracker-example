import React, {useMemo} from "react";
import {Line, LineConfig} from "@ant-design/plots";

interface ChartProps {
    data?: any[]
}

export const Chart: React.FC<ChartProps> = (props) => {
  const {data} = props

  const config: LineConfig = useMemo(() => {
    return {
      data: data ?? [],
      xField: 'date',
      yField: 'data',
      seriesField: 'name',
      legend: {position: 'top'},
      smooth: true,
      animation: {appear: {animation: 'path-in', duration: 2000}},
    };
  }, [data]);

  return <Line {...config} />
}