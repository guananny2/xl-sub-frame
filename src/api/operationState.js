import request from '@/utils/request'

export function fetchOperationStateList(params) {
  return request({
    url: '/operationState/statistics',
    method: 'post',
    params
  })
}
