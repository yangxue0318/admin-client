//包含n个用于创建action对象/函数工厂函数（action creator）
import {SET_HEADER_TITLE} from './action-types'
//设置头部标题的action
export const setHeaderTitle=(headerTitle)=>({types:SET_HEADER_TITLE,data:headerTitle})