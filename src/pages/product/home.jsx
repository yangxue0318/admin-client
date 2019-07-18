import React, { Component } from 'react'
import {Card,Select,Button,Icon,Table,Input} from 'antd'
import {reqProducts} from '../../api'
import LinkButton from '../../components/link-button';
const Option=Select.Option;
//商品管理的首页组件
export default class ProductHome extends Component {
    state={
        isLoding:false,
        products:[],
        total:0 //商品列表
 
    }
    initColumns=()=>{
        this.columns=[
            {
                title:'商品名称',
                dataIndex:'name'
            },
            {
             title:'商品描述',
             dataIndex:'desc'
         },
         {
             title:'商品价格',
             dataIndex:'price', 
             render:(price)=>'￥'+price
         },
         {
             title:'状态',
             width:100,
             dataIndex:'status', 
             render:(status)=>{
                 let btnText='下架'
                 let text='在售'
                 if(status===2){
                     btnText='上架'
                     text='已下架'
                 }
                return(
                <span>
                 <button>{btnText}</button><br/>
                 <span>{text}</span>
             </span>
             ) 
             }
         },
         {
             title:'操作',
            
             render:(product)=>(
                 <span>
                     <LinkButton>详情</LinkButton>
                     <LinkButton>修改</LinkButton>
                 </span>
             )
         }
 
        ];
    }
    getProducts=async(pageNum)=>{
        //发送请求，获取数据
      const result= await reqProducts(pageNum,2);
      if(result.status===0){
          const {total,list}=result.data;
          this.setState({
               products:list,
               total
          })
      }
    }
    componentWillMount(){
        this.initColumns();
    }
    componentDidMount(){
        //获取第一页显示
        this.getProducts(1);
    }
     render(){
         let {isLoding,products,total}=this.state;
         const title=(
             <span>
                <Select style={{width:200}} value="2">
                    <Option value="1">按名称搜索</Option>
                    <Option value="2">按品类搜索</Option>
                </Select>
                 <Input style={{width:200, margin:'0 10px'}} placeholder="关键字"/>
                 <Button type="primary">搜索</Button>
             </span>
         )
         const extra=(
           <Button type="primary">
               <Icon type="plus"></Icon>
               添加商品
           </Button>
         )
         return (
            <Card title={title} extra={extra} >
                  <Table
                 columns={ this.columns}
                 dataSource={products}
                 bordered={true}
                 loading={isLoding}
                 rowKey="_id"
                 pagination={
                     {
                         total,
                         defaultPageSize:2,
                         showQuickJumper:true,
                         onChange:this.getProducts
                        }
                    }
                 />
            </Card>
 
         )
     }
}
