import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import store from './redux/store'
import {Provider} from 'react-redux'
ReactDOM.render((
    //provider对象会将所有接收到的store对象提供给所有的容器组件
    <Provider  store={store}>
    <App/>
    </Provider>
),
document.getElementById('root'));
//绑定监视store内部状态数据改变的监听
// store.subscribe(()=>{
//     ReactDOM.render(//重新渲染标签
// <App store={store} />,

// document.getElementById('root'));
// })

