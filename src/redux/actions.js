//包含n个用于创建action对象/函数工厂函数（action creator）
import {SET_HEADER_TITLE} from './action-types'

//设置头部标题的action
export const setHeaderTitle=(headerTitle)=>({type:SET_HEADER_TITLE,data:headerTitle})
//登陆的异步action
export  function login(){
return dispatch=>{
    //发送登录的异步ajax请求
    //请求结束，分发同步action
    //如果成功了，发成功的同步action
    //如果失败了，发失败的同步action
}
}