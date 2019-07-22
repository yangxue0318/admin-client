//包含N个用于创建action对象的工厂函数
//创建增加的action
import {INCREMENT,DECREMENT} from './action-types'
import { dispatch } from 'rxjs/internal/observable/pairs';
export const increment=(number)=>({type:INCREMENT,number})
//创建减少的action
export const decrement=(number)=>({type:DECREMENT,number})
//创建异步增加的action,异步action他是一个函数,参数是dispatch函数
//执行一个异步代码，完成后分发一个同步action
export function incrementAsync(number){
return dispatch=>{
    setTimeout(()=>{
     dispatch(increment(number))
    },1000)

}
}