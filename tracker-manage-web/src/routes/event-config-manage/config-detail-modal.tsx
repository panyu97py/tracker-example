import React, {useEffect} from "react";
import {ModalForm, ProFormSelect, ProFormText} from "@ant-design/pro-components";
import {Form} from "antd";
import {noop} from "@/utils";

interface ConfigDetailModalProps {
    visible?: boolean
    value?: Record<string, any>
    onFinish?: (values: any) => Promise<void>
    onVisibleChange?: (visible: boolean) => void
}

export interface ConfigDetailModalHandler {
    setFieldsValue: (values: Record<string, any>) => void;
}

export const ConfigDetailModal: React.FC<ConfigDetailModalProps> = (props) => {
  const {visible, value, onFinish, onVisibleChange = noop} = props;

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <ModalForm
      title="事件详情"
      layout="horizontal"
      open={visible}
      form={form}
      width={400}
      onFinish={onFinish}
      onOpenChange={onVisibleChange}
    >
      <ProFormText hidden name="id" />
      <ProFormSelect
        required
        name="eventType"
        label="事件类型"
        placeholder="请输入事件名称"
        options={[
          {value: 'CLICK', label: '点击（CLICK）'},
          {value: 'EXPOSURE', label: '曝光 (EXPOSURE)'},
        ]}
      />
      <ProFormText
        required
        name="eventName"
        label="事件名称"
        placeholder="请输入事件名称"
      />
      <ProFormText
        required
        name="eventDese"
        label="事件描述"
        placeholder="请输入事件描述"
      />
    </ModalForm>
  )
}