import request from '@/utils/request'

export function fetchList(url, method) {
  return request({
    url,
    method
  })
}

export function fetchTreeList(url) {
  return request({
    url: url,
    method: 'get'
  })
}
