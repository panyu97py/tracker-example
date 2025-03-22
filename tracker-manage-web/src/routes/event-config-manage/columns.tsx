import {ProTableProps} from "@ant-design/pro-components";
import {Space} from "antd";
import dayjs from "dayjs";
import {generateContextLink} from "@/components";
import {EventConfigManagementCtx} from "./context";


const nowDate = dayjs().format('DD');

const {Link} = generateContextLink(EventConfigManagementCtx)

export const columns: ProTableProps<any, any>['columns'] = [
  {

    title: '事件名称',
    dataIndex: 'eventName',
    key: 'eventName',
    tooltip: "eventName"
  },
  {
    title: '事件描述',
    search: false,
    key: 'eventDesc',
    dataIndex: 'eventDesc',
    tooltip: "eventDesc"
  },
  {
    title: '事件类型',
    key: 'eventType',
    dataIndex: 'eventType',
    valueType: 'select',
    valueEnum: {
      CLICK: '点击（CLICK）',
      EXPOSURE: '曝光 (EXPOSURE)',
    },
  },
  {
    title: '今日上报指标',
    hideInSearch: true,
    children: [
      {
        title: '次数（PV）',
        dataIndex: 'pvCount',
      },
      {
        title: '人数（UV）',
        dataIndex: 'uvCount',
      },
    ],
    tooltip: '每30分钟更新一次',
  },
  {

    title: '创建时间',
    dataIndex: 'createTime',
    hideInSearch: true,
    key: 'createTime',
  },
  {

    title: '修改时间',
    dataIndex: 'updateTime',
    hideInSearch: true,
    key: 'updateTime',
  },
  {
    title: '操作',
    search: false,
    render: (_, record) => {
      return (
        <>
          <Space>
            <Link
              type="link"
              effectName="lookEventDataTrend"
              effectParams={record}
              content="查看"
            />
            <Link
              type="link"
              effectName="editEventConfig"
              effectParams={record}
              content="编辑"
            />
            <Link
              type="link"
              danger
              effectName="deleteEventConfig"
              effectParams={record}
              content="删除"
            />
          </Space>
        </>
      );
    },
  },
];
