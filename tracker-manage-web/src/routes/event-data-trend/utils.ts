import dayjs from 'dayjs';

interface DataItem {
  pvCount: number;
  uvCount: number;
  startTimestamp: number;
  endTimestamp: number;
}

interface TransformOptions {
  startTimestamp: number;
  endTimestamp: number;
  data: DataItem[];
  interval?: number;
}

interface TransformedDataItem {
  time: string;
  value: number;
  category: string;
}

export const transformedData = (opt: TransformOptions): TransformedDataItem[] => {
  const { startTimestamp, endTimestamp, data, interval = 60000 } = opt;

  const generateTimeSeries = (start: number, end: number, interval: number): string[] => {
    const times: string[] = [];
    for (let t = start; t <= end; t += interval) {
      times.push(dayjs(t).format("HH:mm"));
    }
    return times;
  };

  const timeSeries = generateTimeSeries(startTimestamp, endTimestamp, interval);
  const dataMap = new Map<string, TransformedDataItem>();

  timeSeries.forEach(time => {
    dataMap.set(`${time}-PV Count`, { time, value: 0, category: "PV Count" });
    dataMap.set(`${time}-UV Count`, { time, value: 0, category: "UV Count" });
  });

  data.forEach(item => {
    const startTimeStr = dayjs(item.startTimestamp).format("HH:mm");
    const endTimeStr = dayjs(item.endTimestamp).format("HH:mm");

    if (dataMap.has(`${startTimeStr}-PV Count`)) {
      dataMap.get(`${startTimeStr}-PV Count`)!.value = item.pvCount;
    }
    if (dataMap.has(`${endTimeStr}-UV Count`)) {
      dataMap.get(`${endTimeStr}-UV Count`)!.value = item.uvCount;
    }
  });

  return Array.from(dataMap.values());
};


export const generateMockCountData =()=> {
  return {
    eventType: "EXPOSURE",
    eventName: "productExposure",
    pvCount: Math.floor(Math.random() * 500),
    uvCount: Math.floor(Math.random() * 50) + 1
  };
}

interface Opt{
  startTimestamp:number;
  endTimestamp:number;
}

export const  generateMockTrendData=(opt:Opt)=> {
  const interval = 60000; // 1分钟
  const data = [];

  const { startTimestamp, endTimestamp } = opt;

  for (let timestamp = startTimestamp; timestamp <= endTimestamp; timestamp += interval) {
    data.push({
      pvCount: Math.floor(Math.random() * 200),
      uvCount: Math.floor(Math.random() * 10) + 1,
      startTimestamp:timestamp,
      endTimestamp: timestamp + interval - 1
    });
  }

  return data
}
