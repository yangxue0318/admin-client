import React, {Component} from 'react'
import {connect} from 'react-redux'
import Counter from '../components/counter'
import {increment,decrement,incrementAsync} from '../redux/action'
//通过包装UI组件（Counter)生成容器组件
//容器组件通过connect产生的
/* 将特定的state数据映射成标签的一般属性传递给UI组件(Counter)，
redux在调用此函数时传入了store.getState()的值 */
/* const  mapStateToprops=(state)=>({//返回的对象的所有属性传递给UI组件
  count:state
}) */
/* 将包含的dispatch函数调用语句的函数映射成函数属性传递给UI组件
redux在调用此函数时传入了store.dispatch()的值 */
/* const  mapDispatchToProps=(dispatch)=>({
  increment:(number)=>{dispatch(increment(number))},
  decrement:(number)=>{dispatch(decrement(number))}
}) */

// export default connect(
//   mapStateToprops,//用来指定传递那些的一般属性
//   mapDispatchToProps//用来指定传递那些函数属性
// )(Counter)

export default connect(
 state=>({count:state}),
 {increment,decrement,incrementAsync}
)(Counter)

/* 容器组件：
通过connect包装UI组件产生的组件
容器组件是UI组件的父组件
容器组件负责向UI组件传入标签属性
一般属性：由第一个函数参数的返回值对象决定属性值从state中取出
函数属性：由第二个参数来决定
参数是函数：函数返回的对象中所有方法作为函数属性传递给UI组件
参数是对象：包装对象中的每个方法，将包装后的方法作为函数属性传递给UI组件 */