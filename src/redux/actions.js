//包含n个用于创建action对象/函数工厂函数（action creator）
import {
    SET_HEADER_TITLE,
    RECEIVE_USER,
    SHOW_ERROR,
    LOGOUT
} from './action-types'
import {reqLogin} from '../api'
import storageUtils from '../utils/storageUtils';
//设置头部标题的action
export const setHeaderTitle=(headerTitle)=>({type:SET_HEADER_TITLE,data:headerTitle})
//接收用户同步的action
export const receiveUser=(user)=>({type:RECEIVE_USER,user})
//显示错误信息同步action
export const showError=(errorMsg)=>({type:SHOW_ERROR,errorMsg})
//退出登陆的同步action
export const logout=()=>{
    //删除local中的user
    storageUtils.removeUser()
    //返回一个action对象
    return {type:LOGOUT}
}
//登陆的异步action
export  function login(username,password){
return async dispatch=>{
    //发送登录的异步ajax请求
    let result=await reqLogin(username,password)
    //请求结束，分发同步action
    if(result.status===0){
      const user=result.data;
      storageUtils.saveUser(user)
      dispatch(receiveUser(user))
    }else{
        const msg=result.msg;
        dispatch(showError(msg))
    }
    //如果成功了，发成功的同步action
    //如果失败了，发失败的同步action
}
}