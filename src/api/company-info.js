import request from '@/utils/request'

export function fetchList(url) {
  return request({
    url: '/company/list',
    method: 'get'
  })
}

