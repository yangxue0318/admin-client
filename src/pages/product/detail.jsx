import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
    Card,
    List,
    Icon
} from 'antd'
import LinkButton from '../../components/link-button';
import memoryUtils from '../../utils/memoryUtils'
import { BASE_IMG } from '../../utils/Constants'
import { reqCategory } from '../../api'
const Item = List.Item;
//商品详情路由组件
export default class ProductDetail extends Component {
    state = {
        categoryName: '',
        product: memoryUtils.product
    }
    getCategory = async (categoryId) => {
        const result = await reqCategory(categoryId)
        if (result.status === 0) {
            const categoryName = result.data.name;
            this.setState({ categoryName })
        }
    }
    componentDidMount() {
        const product = memoryUtils.product;
        if (product._id) {
            this.getCategory(product.categoryId);//查去分类的id
        }
        //如果当前product没有数据，根据id中请求参数中获取商品并更新
        if (!this.state.product._id) {
            setTimeout(() => {
                const id = this.props.match.params._id
                // this.getCategory(product.categoryId);
                this.setState({
                    product
                })
            }, 500)
        }

    }
    render() {
        const { categoryName } = this.state;
        // const product=memoryUtils.product||{};
        const product = this.state.product
        //  debugger
        // if(!product||!product._id){
        //     return <Redirect to="/product"/>
        // }
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type="arrow-left" />
                </LinkButton>
                <span>商品详情</span>
            </span>
        )

        return (
            <Card title={title} className="detail">
                <List>
                    <Item>
                        <span className="detail-left">商品名称</span>
                        <span>{product.name}</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品描述</span>
                        <span>{product.desc}</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品价格</span>
                        <span>{product.price}</span>
                    </Item>
                    <Item>
                        <span className="detail-left">所属分类</span>
                        <span>{categoryName}</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品图片</span>
                        <span>
                            {
                                //product.imgs.map(img=><img className="detail-img" key={img}  src={BASE_IMG+img} alt="img"/>)
                                product.imgs && product.imgs.map(img => <img className="detail-img" key={img} src={BASE_IMG + img} alt="img" />)
                            }


                        </span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品详情</span>
                        <div dangerouslySetInnerHTML={{ __html: product.detail }}></div>
                    </Item>
                </List>
            </Card>
        )
    }
}
