import React from "react";
import {ModalForm, ProFormSelect, ProFormText} from "@ant-design/pro-components";
import {Form} from "antd";

interface ConfigDetailModalProps {
    visible?: boolean
    onClose?: () => void
    onFinish?: (values: any) => Promise<void>
}

export const ConfigDetailModal: React.FC<ConfigDetailModalProps> = (props) => {
  const {visible, onFinish} = props;
  const [form] = Form.useForm()
  return (
    <ModalForm
      title="事件详情"
      layout="horizontal"
      open={visible}
      form={form}
      width={400}
      onFinish={onFinish}
    >
      <ProFormText hidden name="id" />
      <ProFormText
        name="eventName"
        label="事件名称"
        placeholder="请输入事件名称"
      />
      <ProFormSelect
        name="eventType"
        label="事件类型"
        placeholder="请输入事件名称"
        options={[
          {value: 'CLICK', label: '点击（CLICK）'},
          {value: 'EXPOSURE', label: '曝光 (EXPOSURE)'},
        ]}
      />
    </ModalForm>
  )
}