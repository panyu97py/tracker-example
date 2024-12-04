import React, {useState} from "react";
import {service} from "@/service";
import {ProCard, ProTable, ProTableProps} from "@ant-design/pro-components";
import {columns} from "./columns";
import {Button} from "antd";
import {ConfigDetailModal} from "./config-detail-modal";


export const EventConfigManage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const fetchEventConfigByPage: ProTableProps<any, any>['request'] = async (params, sort, filter) => {
    const data = await service.fetchEventConfigByPage(params)
    return {data}
  }

  const handleCreateEventConfig = () => setVisible(true)

  const createEventConfigBtnVNode = <Button type="primary" onClick={handleCreateEventConfig}>创建点位</Button>

  return (
    <ProCard>
      <ProTable
        columns={columns}
        request={fetchEventConfigByPage}
        toolbar={{actions: [createEventConfigBtnVNode]}}
      />
      <ConfigDetailModal visible={visible} onClose={() => setVisible(false)} />
    </ProCard>
  )
}