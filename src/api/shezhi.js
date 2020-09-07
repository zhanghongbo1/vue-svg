import request from '@/utils/request'

 export const  getLogin=()=>{
  return request({
    url: '/getLogin',
    method: 'post',
  })
 }