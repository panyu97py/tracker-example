import {serviceHelper} from "@/service/helper";
import {
  IReqCreateEventConfig, IReqEventDataTrendData,
  IReqFetchEventConfigByPage,
  IReqId, IReqUpdateEventConfig,
  IResEventConfig,
  IResFetchEventConfigByPage
} from './types';

export * from './types'

export const eventConfigService = {

  fetchEventDataTrendData: serviceHelper.define<any, IReqEventDataTrendData>({
    url:'/eventDataTimeAggregation/trend',
    method: 'get'
  }),
  /**
     * 事件配置列表
     */
  fetchEventConfigByPage: serviceHelper.define<IResFetchEventConfigByPage, IReqFetchEventConfigByPage>({
    url: '/eventConfig/queryByPage',
    method: 'get'
  }),
  /**
     * 事件配置详情
     */
  fetchEventConfigDetail: serviceHelper.define<IResEventConfig, IReqId>({
    url: '/eventConfig/detail',
    method: 'get'
  }),
  /**
     * 创建事件配置
     */
  createEventConfig: serviceHelper.define<boolean, IReqCreateEventConfig>({
    url: '/eventConfig/create',
    method: 'post'
  }),
  /**
     * 更新事件配置
     */
  updateEventConfig: serviceHelper.define<boolean, IReqUpdateEventConfig>({
    url: '/eventConfig/update',
    method: 'post'
  }),
  /**
     * 删除事件配置
     */
  deleteEventConfig: serviceHelper.define<boolean, IReqId>({
    url: '/eventConfig/delete',
    method: 'post'
  })
}
