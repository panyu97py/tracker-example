import React, {useRef, useState} from "react";
import {EventConfig, EventConfigListItem, eventConfigService} from "@/service";
import {ProCard, ProTable, ProTableProps} from "@ant-design/pro-components";
import {columns} from "./columns";
import {Button} from "antd";
import {ConfigDetailModal} from "./config-detail-modal";
import {EventConfigManagementCtx, EventConfigManagementCtxVal} from "./context";
import type {ActionType} from '@ant-design/pro-components';
import { useNavigate } from 'react-router-dom';


enum OperateType {
    EDIT = 'EDIT',
    CREATE = 'CREATE',
}


export const EventConfigManage: React.FC = () => {
  const [configDetailModalVisible, setConfigDetailModalVisible] = useState(false);

  const [operateType, setOperateType] = useState<OperateType>(OperateType.EDIT);

  const [waitEditData, setWaitEditData] = useState<EventConfig>();

  const proTableRef = useRef<ActionType>(null);

  const navigate = useNavigate();


  const handleCreateEventConfig = () => {
    setOperateType(OperateType.CREATE)
    setConfigDetailModalVisible(true)
  }

  const handleLookEventDataTrend = (dataItem: EventConfigListItem) => navigate(`/trend/${dataItem.id}`,)

  const handleEditEventConfig = async (dataItem: EventConfigListItem) => {
    const {id} = dataItem;
    const eventConfigDetail = await eventConfigService.fetchEventConfigDetail({id})
    setOperateType(OperateType.EDIT)
    setConfigDetailModalVisible(true)
    setWaitEditData(eventConfigDetail);
  }

  const handleDeleteEventConfig = async (dataItem: EventConfigListItem) => {
    const {id} = dataItem;
    await eventConfigService.deleteEventConfig({id})
    proTableRef.current?.reload()
  }

  const handleSubmitEventConfig = async (value: EventConfig) => {
    if (operateType === OperateType.CREATE) await eventConfigService.createEventConfig(value)
    if (operateType === OperateType.EDIT) await eventConfigService.updateEventConfig(value)
    setConfigDetailModalVisible(false)
    proTableRef.current?.reload()
  }

  const fetchEventConfigByPage: ProTableProps<any, any>['request'] = async (params) => {
    const {data, total} = await eventConfigService.fetchEventConfigByPage(params)
    return {data, total}
  }


  const createEventConfigBtnVNode = <Button type="primary" onClick={handleCreateEventConfig}>创建点位</Button>

  const ctxVal: EventConfigManagementCtxVal = {
    lookEventDataTrend: handleLookEventDataTrend,
    editEventConfig: handleEditEventConfig,
    deleteEventConfig: handleDeleteEventConfig,
  }

  return (
    <EventConfigManagementCtx.Provider value={ctxVal}>
      <ProCard>
        <ProTable
          actionRef={proTableRef}
          columns={columns}
          request={fetchEventConfigByPage}
          toolbar={{actions: [createEventConfigBtnVNode]}}
        />
        <ConfigDetailModal
          value={waitEditData}
          visible={configDetailModalVisible}
          onFinish={handleSubmitEventConfig}
          onVisibleChange={(visible) => setConfigDetailModalVisible(visible)}
        />
      </ProCard>
    </EventConfigManagementCtx.Provider>

  )
}
