import axios from 'axios'
import qs from 'qs' // 处理post请求数据格式
import { Toast } from 'vant';
import router from '@/router'

let toast=''
const $axios = axios.create({
  // 设置超时时间
  timeout: 30000,
  // 基础url，会在请求url中自动添加前置链接
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  responseType: 'json',
  // 对发送请求前的请求头进行配置
  transformRequest: [function (data, headers) {
    const ct = headers['Content-Type']
    // json 类型
    if (ct && ct.indexOf('application/json') > -1) {
      return JSON.stringify(data)
    }
    // FormData 类型，ie10 +
    if (ct && ct.indexOf('multipart/form-data') > -1) {
      return data
    }
    // Do whatever you want to transform the data
    return qs.stringify(data)
  }]
})


// 在全局请求和响应拦截器中添加请求状态

/**
 * 请求拦截器
 * 用于处理请求前添加loading、判断是否已保存token，并在每次请求头部添加token
 */
$axios.interceptors.request.use(
  config => {
    toast= Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    const token = 'Bearer '+ localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token // 请求头部添加token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * 响应拦截器
 * 用于处理loading状态关闭、请求成功回调、响应错误处理
 */
$axios.interceptors.response.use(
  response => {
    if (toast) {
      toast.clear()
    }
    const code = response.status
    // 请求成功返回response.data
    if (code == 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (toast) {
      toast.clear()
    }
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回401 清除token信息并跳转到登陆页面
       
          break
        case 404:
          // Message.error('网络请求不存在')
          Toast.fail('网络请求不存在');
          break
          case 400:
            // Message.error('网络请求不存在')
            Toast.fail('账号或密码错误');
            break
            case 403:
              // Message.error('网络请求不存在')
              Toast.fail('token过期或失效请重新登录');
              localStorage.removeItem('token')
              router.push('/login')
              break
        default:
          Toast.fail('请求失败');
      }
    } else {
      // 请求超时或者网络有问题
      if (error.message.includes('timeout')) {
        console.log('bbb')
        Toast.fail('请求超时！请检查网络是否正常')
      } else {
        console.log('aaa')
        Toast.fail('token失效')
        localStorage.removeItem('token')
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)

// get，post请求方法
export default $axios
