
import {INCREMENT,DECREMENT} from './action-types'
//真正管理数据状态的函数
//根据老的state和action产生新的state
export default function count(state=1,action){
    console.log('count()',state,action)
 switch (action.type) {
     case INCREMENT:
         return state+action.number
     case DECREMENT:
         return state-action.number
     default://产生初始状态值
         return  state
         
 }
}

