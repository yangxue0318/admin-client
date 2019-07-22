import React, { Component } from 'react'
import { Card, Select, Button, Icon, Table, Input, message } from 'antd'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import LinkButton from '../../components/link-button';
import { PAGE_SIZE } from '../../utils/Constants'
import memoryUtils from '../../utils/memoryUtils'
import throttle from 'lodash.throttle'
const Option = Select.Option;
//商品管理的首页组件
export default class ProductHome extends Component {
    state = {
        isLoding: false,
        products: [],
        total: 0,//商品列表
        searchType: 'productName',//默认是按商品名称搜索
        searchName: ''//搜索的关键字
    }
    updateStatus = throttle(async (productId, status) => {
        //计算更新后得值
        status = status === 1 ? 2 : 1
        const result = await reqUpdateStatus(productId, status)
        if (result.status === 0) {
            message.success('更新商品状态成功')
            this.getProducts(this.pageNum);
        }

    }, 2000)
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '商品价格',
                dataIndex: 'price',
                render: (price) => '￥' + price
            },
            {
                title: '状态',
                width: 100,
                // dataIndex:'status', 
                render: ({ _id, status }) => {//1:是在售，2：下架
                    let btnText = '下架'
                    let text = '在售'
                    if (status === 2) {
                        btnText = '上架'
                        text = '已下架'
                    }
                    return (
                        <span>
                            <button onClick={() => { this.updateStatus(_id, status) }}>{btnText}</button><br />
                            <span>{text}</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',

                render: (product) => (
                    <span>
                        <LinkButton onClick={() => {
                            //在内存中保存product
                            memoryUtils.product = product;
                            this.props.history.push('/product/detail/' + product._id)
                        }}>详情</LinkButton>
                        <LinkButton onClick={() => {
                            //在内存中保存product
                            memoryUtils.product = product;
                            this.props.history.push('/product/addupdata')
                        }}>
                            修改
                        </LinkButton>
                    </span>
                )
            }

        ];
    }
    //异步获取指定页码商品分页（可能带搜索）列表显示
    getProducts = async (pageNum) => {
        //保存当前页码
        this.pageNum = pageNum;
        const { searchType, searchName } = this.state;
        let result;
        if (!this.search) {
            //发送请求，获取数据
            result = await reqProducts(pageNum, PAGE_SIZE);
        } else {
            result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType });
        }

        if (result.status === 0) {
            const { total, list } = result.data;
            this.setState({
                products: list,
                total
            })
        }
    }
    componentWillMount() {
        this.initColumns();
    }
    componentDidMount() {
        //获取第一页显示
        this.getProducts(1);
    }
    render() {
        let { isLoding, products, total, searchType, searchName } = this.state;
        const title = (
            <span>
                <Select style={{ width: 200 }}
                    value={searchType}
                    onChange={(value) => { this.setState({ searchType: value }) }}>
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input style={{ width: 200, margin: '0 10px' }}
                    placeholder="关键字"
                    value={searchName}
                    onChange={event => { this.setState({ searchName: event.target.value }) }}
                />
                <Button type="primary" onClick={
                    () => {
                        this.search = true
                        this.getProducts(1)
                    }

                }>搜索</Button>
            </span>
        )
        const extra = (
            <Button type="primary" onClick={() => {
                memoryUtils.product = {};
                this.props.history.push('/product/addupdata')
            }}>
                <Icon type="plus"></Icon>
                添加商品
           </Button>
        )
        return (
            <Card title={title} extra={extra} >
                <Table
                    columns={this.columns}
                    dataSource={products}
                    bordered={true}
                    loading={isLoding}
                    rowKey="_id"
                    pagination={
                        {
                            total,
                            defaultPageSize: PAGE_SIZE,
                            showQuickJumper: true,
                            onChange: this.getProducts,
                            current: this.pageNum//当前页数
                        }
                    }
                />
            </Card>

        )
    }
}
