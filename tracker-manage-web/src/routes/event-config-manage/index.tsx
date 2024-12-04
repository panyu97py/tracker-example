import React, {useRef, useState} from "react";
import {service} from "@/service";
import {ProCard, ProTable, ProTableProps} from "@ant-design/pro-components";
import {columns} from "./columns";
import {Button} from "antd";
import {ConfigDetailModal, ConfigDetailModalHandler} from "./config-detail-modal";
import {EventConfigManagementCtx, EventConfigManagementCtxVal} from "./context";


enum OperateType {
    EDIT = 'EDIT',
    CREATE = 'CREATE',
}


export const EventConfigManage: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const [operateType, setOperateType] = useState<OperateType>(OperateType.EDIT);

  const configDetailModalRef = useRef<ConfigDetailModalHandler>(null)



  const handleCreateEventConfig = () => {
    setOperateType(OperateType.CREATE)
    setVisible(true)
  }

  const handleLookEventDataTrend = () => {
  }

  const handleEditEventConfig = (dataItem:any) => {
    configDetailModalRef.current?.setFieldsValue(dataItem)
    setOperateType(OperateType.CREATE)
    setVisible(true)
  }

  const handleDeleteEventConfig = () => {
  }

  const handleSubmitEventConfig = async (value: any) => {
    console.log({value, operateType})
    setVisible(false)
  }

  const fetchEventConfigByPage: ProTableProps<any, any>['request'] = async (params, sort, filter) => {
    const data = await service.fetchEventConfigByPage(params)
    return {data}
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
          columns={columns}
          request={fetchEventConfigByPage}
          toolbar={{actions: [createEventConfigBtnVNode]}}
        />
        <ConfigDetailModal
          visible={visible}
          ref={configDetailModalRef}
          onVisibleChange={() => setVisible(false)}
          onFinish={handleSubmitEventConfig}
        />
      </ProCard>
    </EventConfigManagementCtx.Provider>

  )
}