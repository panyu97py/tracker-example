import {ProTableProps} from "@ant-design/pro-components";
import {Button, Space} from "antd";
import dayjs from "dayjs";


const nowDate = dayjs().format('DD');

export const columns: ProTableProps<any, any>['columns'] = [
  {
    dataIndex: 'key',
    width: 200,
    key: 'key',
    title: '点位名称',
    tooltip:"event_name"
  },
  {
    title: '点位描述',
    width: 150,
    key: 'event_desc',
    dataIndex: 'event_desc',
    tooltip:"event_desc"
  },
  {
    title: '今日上报指标',
    hideInSearch: true,
    children: [
      {
        title: '次数（PV）',
        width: 95,
        dataIndex: ['counts', 0, `p${nowDate}`],
      },
      {
        title: '人数（UV）',
        width: 95,
        dataIndex: ['counts', 0, `u${nowDate}`],
      },
    ],
    tooltip: '每30分钟更新一次',
  },
  {
    title: '点位类型',
    width: 120,
    key: 'type',
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: {
      CLICK: '点击（CLICK）',
      EXPOSURE: '曝光 (EXPOSURE)',
    },
  },
  {
    title: '操作',
    fixed: 'right',
    search:false,
    render: (_, record, __, action) => {
      return (
        <>
          <Space>
            <Button type="link">查看</Button>
            <Button type="link">编辑</Button>
          </Space>
        </>
      );
    },
  },
];
