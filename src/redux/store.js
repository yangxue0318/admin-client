//redux最核心的管理对象 ：store
import {createStore,applyMiddleware} from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
//根据指定的reducer函数，产生一个store对象
//store对象内部管理着状态数据，状态数据的初始值为reducer()的返回值
//应用异步中间件

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))