import request from '@/utils/request'

export const login=(params)=>{
  return request({
    url: '/login',
    method: 'post',
    data: params
  })
}
export const getI=(params)=>{
  return request({
    url: '/getI',
    method: 'post',
    data: params
  })
}