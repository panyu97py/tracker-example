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
      xField: "time",
      yField: "value",
      seriesField: "category",
      legend: {position: 'top'},
      colorField: 'category',
      style: {shape: 'smooth'},
      animation: {appear: {animation: 'path-in', duration: 2000}},
    };
  }, [data]);

  return <Line {...config} />
}
