import React,{ Component } from "react";
import './index.less'
import {formateDate} from '../../utils/dateUtils'
import {withRouter} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Modal, Button } from 'antd';
import storageUtils from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'
import {reqWeather} from '../../api'
import LinkButton from '../../components/link-button'
import {connect} from 'react-redux'
import {logout} from '../../redux/actions'
// const { confirm } = Modal;
 class Header extends Component{
     state={
         currentTime:formateDate(Date.now()),
         dayPictureUrl:'',//图片
         weather:'',//天气文本
     }
    //退出
    logout=()=>{
        Modal.confirm({
            title: '确定删除吗?',
            onOk:()=> {
                console.log('OK');
                //确定后删除内存的用户
                //local
              this.props.logout()
              },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    getTitle=()=>{
        let title="";
        const path=this.props.location.pathname;
        menuList.forEach(item=>{
            if(item.key===path){
                title=item.title;
            }else if(item.children){
                const cItem=item.children.find(cItem=>path.indexOf(cItem.key)===0)
                        if(cItem){
                            title=cItem.title;
                        }
                
            }

        })
        return title;
    }
    //获取天气信息显示
    getWeather=async()=>{
      const {dayPictureUrl, weather}=await reqWeather('北京')
        this.setState({
            dayPictureUrl,
             weather
        })
    }
    componentDidMount(){
       this.intervalId=setInterval(()=>{
         this.setState({
             currentTime:formateDate(Date.now())
         })
        },1000);
        this.getWeather()
    }
    //清除定时器
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
   render(){
       const {currentTime,dayPictureUrl, weather}=this.state;
       //得到当前需要显示的title
      // const title=this.getTitle();
      const title=this.props.headerTitle
       const user=this.props.user;
       return (
           <div className="header">
               <div className="header-top">
                   欢迎，{user.username} &nbsp;&nbsp;
                 <LinkButton onClick={this.logout}>退出</LinkButton>
               </div>
               <div className="header-bottom">
                    <div className="header-bottom-left">
                        {title}
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
               </div>
           </div>
       )
   }
}
export default connect(
 state=>({
    headerTitle:state.headerTitle,
    user:state.user
 }),
 {logout}
)(withRouter(Header));