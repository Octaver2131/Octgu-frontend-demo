// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addItem POST /api/item/add */
export async function addItemUsingPost(body: API.ItemAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseInt_>('/api/item/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteItem POST /api/item/delete */
export async function deleteItemUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/item/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateItem POST /api/item/update */
export async function updateItemUsingPost(
  body: API.ItemUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/item/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getItemById GET /api/item/get */
export async function getItemByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { id?: number },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseItemVO_>('/api/item/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listItemByPage GET /api/item/list/page */
export async function listItemByPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ItemQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageItemVO_>('/api/item/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listItems GET /api/item/list */
export async function listItemsUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ItemQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseItemVO[]>('/api/item/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getStatistics GET /api/item/statistics */
export async function getStatisticsUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseMapStringObject_>('/api/item/statistics', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getMonthlyStatistics GET /api/item/monthlyStatistics */
export async function getMonthlyStatisticsUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { year?: number },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseMapStringObject_>('/api/item/monthlyStatistics', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
