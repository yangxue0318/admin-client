import React, {Component} from 'react'
import PropTypes from 'prop-types'

//UI组件，负责显示（初始显示和更新显示）
//在编码上没有使用的任何redux相关语法
 export default class Counter extends Component {
    static propTypes={
      count:PropTypes.number.isRequired,
      increment:PropTypes.func.isRequired,
      decrement:PropTypes.func.isRequired,
      incrementAsync:PropTypes.func.isRequired
    }
    increment=()=>{
      const number=this.refs.numberSelect.value*1;
      this.props.increment(number)
    }
    decrement=()=>{
      const number=this.refs.numberSelect.value*1;
      this.props.decrement(number)
    } 
    incrementIfOdd=()=>{
      const count=this.props.count
      const number=this.refs.numberSelect.value*1;
      if(count%2===1){
        this.props.increment(number)
      }
    } 
    incrementAsync=()=>{
      const number=this.refs.numberSelect.value*1;
      this.props.incrementAsync(number)
    }  
      
  
    render() {
     const count=this.props.count
      return (
       <div>
         <p>clack{count}times</p>
         <select ref="numberSelect">
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
         </select>
         &nbsp;
         <button onClick={this.increment}>+</button> &nbsp;
         <button onClick={this.decrement}>-</button> &nbsp;
         <button onClick={this.incrementIfOdd}>increment if odd</button> &nbsp;
         <button onClick={this.incrementAsync}>increment async</button>
       </div>
        
      )
    }
  } 
  
  
  