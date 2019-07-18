//封装能发ajax请求的函数
import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
export default axios

//添加请求拦截器，让post请求体的请求格式为urlencoded格式a=1&b=2
//在真正法送请求体前执行
axios.interceptors.request.use(function(config){
    //得到请求体方式和请求体数据
    const {method,data}=config;
    //处理post请求，将data对象转换成query参数字符串
    if(method.toLowerCase()==='post'&&typeof data==='object'){
        config.data=qs.stringify(data);
    }
    return config;
})
//添加响应拦截器
//在请求返回之后且在我们指定的响应回调函数之前
//功能1：让请求成功的结果不再是response,而是response.data
axios.interceptors.response.use(function(response){
    return response.data//返回的结果就会交给我们指定的请求向应的回调
},function(error){
    message.error('请求出错'+error.message)
   // return Promise.reject(error)
   //返回一个pending状态的promise,中断promise链
   return new Promise(()=>{});
})