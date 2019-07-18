import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import './index.less'
import logo from '../../assets/images/logo.png'
import { Menu, Icon, Button } from 'antd';
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;

 class LeftNav extends Component{
     //根据指定的menu数组生成<Item>和<SubMenu>数组</SubMenu>
    //redaus+函数递归
// getMenuNodes2=(menuList)=>{
//     return menuList.reduce((pre,item)=>{
//         if(!item.children){
//             pre.push (
//                 <Menu.Item key={item.key}>
//                     <Link to={item.key}>
//                     <Icon type={item.Icon} />
//                      <span>{item.title}</span></Link>
//                    </Menu.Item>
//             )
//         }else{
//            pre.push (
//                 <SubMenu
//                 key={item.key}
//                 title={
//                   <span>
//                     <Icon type={item.Icon} />
//                     <span>{item.title}</span>
//                   </span>
//                 }
//               >
//                   {
                     
//                       this.getMenuNodes2(item.children)
//                   }
    
//               </SubMenu>

//             )
//         }
//         return pre;
//     },[])

// }

    //根据指定的menu数组生成<Item>和<SubMenu>数组</SubMenu>
    //map+函数递归
    getMenuNodes=(menuList)=>{
        //请求的路径
        const path=this.props.location.pathname;
       return menuList.map((item)=>{
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                    <Link to={item.key}>
                    <Icon type={item.icon} />
                     <span>{item.title}</span></Link>
                   </Menu.Item>
                   )
            }else {
                //判断当前的item的key是否是我需要的openkey
                //查找item的所有children中cItem的key,看是否有一个跟请求匹配的path
               const cItem=item.children.find(cItem=>cItem.key===path)
                if(cItem){
                    this.openKey=item.key;
                }
            
        
            return (
                <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
              {
                  this.getMenuNodes(item.children)
              }

          </SubMenu>
            )
            }
        })
    
    }

    componentDidMount(){

    }
    //第一次rebder做一些同步的准备工作
    componentWillMount(){
        this.menuNodes= this.getMenuNodes(menuList)
    }
    render(){
       
        //得到当前请求的路由路径
        const selectKey=this.props.location.pathname;
        //const selectKey = this.props.location.pathname
        return (
            <div className="left-nav">
                <Link to="/home" className="left-nav-header">
                <img src={logo} alt="logo"/>
                <h1>硅谷后台</h1>
                </Link>
         <Menu
         selectedKeys={[selectKey]}//默认选中
          
             //selectedKeys={[selectKey]}
             defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        //  defaultSelectedKeys={[]}/
        >


          {
            this. menuNodes
          }
          
              
            { /* <Menu.Item key="/home">
           <Link to="/home">
           <Icon type="home" />
            <span>首页</span></Link>
          </Menu.Item>
          
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="/category">
           <Link to="/category">
           <Icon type="folder-open" />
            <span>品类管理</span></Link>
          </Menu.Item>
          <Menu.Item key="/product">
           <Link to="/product">
           <Icon type="filter" />
            <span>商品管理</span></Link>
          </Menu.Item>
          </SubMenu> */}
         
        </Menu>
            </div>
        )
    }
}
//使用高阶组件包装非路由组件
//新组件向LeftNav传递三个属性
//结果它可以操作路由的相关语法
export default withRouter(LeftNav);