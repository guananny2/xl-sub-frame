import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/failureBeforehand/list',
    method: 'post',
    params
  })
}

export function fetchStatus(params) {
  return request({
    url: '/failureBeforehand/list',
    method: 'get',
    params
  })
}
