import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.less'
import logo from './images/logo.png'
const Item =Form.Item
 class Login extends Component{
    validatorPWd=(rule,value,callback)=>{
        value=value.trim();//去除空格
        if(!value){
            callback('密码不能为空')
        }else if(value.length<=4){
            callback('密码不能小于4位')
        }else if(value.length>=12){
            callback('密码不能大于12位')
        }else  if (!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文，字母数字下划线')
        }else{
            callback();//验证成功
        }

    }
    
    handleSubmit = e => {
        e.preventDefault();
        //去处输入相关的数据
        // const form=this.props.form;
        // const values=form.getFieldsValue();
        // const username=form.getFieldValue('username')
        // const password=form.getFieldValue('password')
        // console.log(values,username,password)

        // alert('发送ajax请求 ')
        //统一验证
        this.props.form.validateFields((err, {username,password}) => {
            if (!err) {
              console.log(`你登陆的用户名是${username},你的密码是${password}`);
            }else{
                alert('验证失败');
            }
          });
      };
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>后台管理系统</h1>
                </div>
               <div className="login-content">
                   <h1>用户登录</h1>
                   <Form onSubmit={this.handleSubmit} className="login-form">
        <Item>
            
        {getFieldDecorator('username', {//from上面有这个属性getFieldDecorator
            initialValue:'',//初始值
            rules: [//声明式验证：使用插件已定义好的规则进行验证
                { required: true, whitespace: true,  message: '用户名不能为空!' },
                { min: 4, message: '用户名不能小于4位!' },
                { max: 12, message: '用户名不能大于12位!' },
                { validator: /^[a-zA-Z0-9_]+$/, message: '用户名必须为应为数字、字母下划线!' },
            ],
          })(
          
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
          )}
        
        </Item>
        <Form.Item>
        {getFieldDecorator('password', {
            initialValue:'',//初始值
            //密码进行自定义验证
            rules: [{ validator:this.validatorPWd }],
          })(
          
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
          )}
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
           登录
          </Button>
        </Form.Item>
      </Form>
               </div>
            </div>
        )
    }

}

const WraapedLoginFrom=Form.create()(Login)// Form.create()返回的就是一个高阶组件
export default WraapedLoginFrom;