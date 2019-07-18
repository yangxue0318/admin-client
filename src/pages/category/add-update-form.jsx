import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'
//添加修改分类的Form组件
 class AddUpdateForm extends Component {
     //声明我接收的参数类型
     static propTypes={
     setForm:PropTypes.func.isRequired,
     categoryName:PropTypes.string
     }
     componentWillMount(){
         this.props.setForm(this.props.form); 
     }
    render() {
        const {getFieldDecorator}=this.props.form;
        const {categoryName}=this.props;
        return (
            <div>
               <Form>
                   <Form.Item>
                       {
                           //自定义校验
                         getFieldDecorator('categoryName',{//{}里面的内容代表的是配置对象
                             initialValue:categoryName||"",
                             rules:[{required:true,message:'分类名称必须输入'}]
                         })(
                            <Input type="text" placeholder="分类名称"/>
                         )  
                       }
                      
                   </Form.Item>
               </Form>
            </div>
        )
    }
}
export default Form.create()(AddUpdateForm)