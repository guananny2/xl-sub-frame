import request from '@/utils/request'

export function fetchOperationStateList(params) {
  return request({
    url: '/operationState/statistics',
    method: 'post',
    params
  })
}

export function fetchOperationCompanyList(params) {
  return request({
    url: '/operationState/companyList',
    method: 'post',
    params
  })
}

export function fetchOperationSelect() {
  return request({
    url: '/operationState/select',
    method: 'get'
  })
}
