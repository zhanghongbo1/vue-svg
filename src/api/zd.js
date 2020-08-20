import request from '@/utils/request'

export const addZd=(params)=>{
  return request({
    url: '/addZd',
    method: 'post',
    data: params
  })
}


export const getList=(params)=>{
  return request({
    url: '/getZd',
    method: 'post',
    data: params
  })
}
export const updata=(params)=>{
  return request({
    url: '/updata',
    method: 'post',
    data: params
  })
}