//管理状态数据的reducer函数
import { combineReducers } from 'redux'
import storageUtils from '../utils/storageUtils'
import {
    SET_HEADER_TITLE,
    RECEIVE_USER,
    SHOW_ERROR,
    LOGOUT
} from './action-types'
//管理应用头部标题的reducer函数
const initHeaderTitle = '首页'
function headerTitle(state = initHeaderTitle, action) {
    switch (action.type) {
        case SET_HEADER_TITLE:
            return action.data
            
        default:
            return state
    }
}
//管理登陆用户的reducer函数
const initUser = storageUtils.getUser()//读取local中保存的user作为初始值
function user(state = initUser, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
            case LOGOUT:
                return {}
        case  SHOW_ERROR:
           return {...state,errorMsg:action.errorMsg} 
        default:
            return state
    }
}
//combineReducers()返回的是一个新的reducer函数（总reducer函数）
const reducer = combineReducers({
    headerTitle,
    user,
})
export default reducer