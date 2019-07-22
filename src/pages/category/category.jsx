import React,{Component} from 'react'
import {Card,Button, Icon,Table, message,Modal} from 'antd'
import LinkButton from '../../components/link-button'
import {reqCategorys} from '../../api'
import AddUpdateForm from './add-update-form';
import {reqAddCategory} from '../../api'
import {reqUpdateCategory} from '../../api'
//  分类管理
export default class Category extends Component{
    state={
        categorys: [],
        isLoding:false,
        showStatus:0 //0代表不显示，1代表显示，2代表隐藏
     }
//初始化table所有信息的列表
    initColumns=()=>{
        this.columns=[
            {
                title: '分类名称',
                dataIndex: 'name',
              },
              {
                title: '操作',
                width:200,  
                render:(category)=><LinkButton onClick={()=>{
                    this.category=category;//保存当前分类。其他地方都可以读取到
                    this.setState({showStatus:2})
                }}>修改分类</LinkButton>
               
            },

        ]

    }
    //组件将要挂在挂上数据
    componentWillMount(){
      this.initColumns();
    
    }
    //发送请求
   componentDidMount(){
       this.getCategorys();
   }
//异步获取分类列表显示
   getCategorys=async()=>{
       //发送异步ajax请求
       this.setState({
           isLoding:true
       })
       const result=await reqCategorys();
       if(result.status===0){
           const categorys=result.data;
           //更新状态categorys的数据
        
           this.setState({
               categorys,
              isLoding:false
           })
           console.log(categorys);
       }else{
           message.error('获取分类列表失败')
       }
   }
   //点击确定，添加分类或者修改分类
   handleOk=()=>{
       //1进行表单验证
    this.form.validateFields(async(err, values) => {
        
        if (!err) {
            //重置输入数据变成初始值
            this.form.resetFields();
          //验证通过后，得到输入数据
          const {categoryName}=values;
          const {showStatus}=this.state;
          let result;
          if(showStatus===1){
              //发添加分类送请求
              result=await reqAddCategory(categoryName)
          }else{//修改
            const categoryId=this.category._id;
            result=await reqUpdateCategory({categoryId,categoryName})

          }
         
           this.setState({showStatus:0})
           const action=showStatus===1?'添加':'修改'
     //根据相应的结果做不同的处理
            if(result.status===0){
         //重新获取分类列表显示
                this.getCategorys();
                message.success(action+'分类成功')
            }else{
                 message.error(action+'分类失败')
               }
            }
    });

     
   }
   //点击取消
   handleCancel=()=>{
    this.form.resetFields();
       this.setState({
        showStatus:0
       })
   }
    render(){
         //Card右上角额结构
        const {categorys,isLoding,showStatus}=this.state;
        //读取更新分类的名称
        const category=this.category || {}
     const extra=(
        <Button type="primary" onClick={()=>{
            this.category={};
            this.setState({showStatus:1})}}>
        <Icon type="plus"/>
        添加
        </Button>
     )
        return (
           <Card extra={extra} >
                <Table
                columns={ this.columns}
                dataSource={categorys}
                bordered={true}
                loading={isLoding}
                rowKey="_id"
                pagination={{defaultPageSize:5,showQuickJumper:true}}
                />
                <Modal
                title={showStatus===1?'添加分类':'修改分类'}
                visible={showStatus!==0 }
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                   {/*将子组件传递过来的form对象保存在档期那组件对象上*/} 
                <AddUpdateForm setForm={form=>this.form=form} categoryName={category.name}/>{/*{category.name}有值就传*/}
                </Modal>
                
              </Card>
        )
    }
}