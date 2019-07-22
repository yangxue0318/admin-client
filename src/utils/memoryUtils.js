import storageUtils from "./storageUtils"
//初始时抽取一次，并保存user
const user=storageUtils.getUser()
export default{
    user,//用来存储登录用户信息，初始值为Local当中的读取user
    product:{}//需要查看的商品对象
}