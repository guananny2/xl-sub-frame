import request from '@/utils/request'

export function fetchList(url) {
  return request({
    url: url,
    method: 'get'
  })
}

export function fetchTreeList(url) {
  return request({
    url: url,
    method: 'get'
  })
}
