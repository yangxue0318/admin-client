import storageUtils from "./storageUtils"

export default{
    user:storageUtils.getUser()//用来存储登录用户信息，初始值为Local当中的读取user
}