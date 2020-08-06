import request from '@/utils/request'

export const getDetail=(params)=>{
  return request({
    url: '/detail',
    method: 'post',
    data: params
  })
}