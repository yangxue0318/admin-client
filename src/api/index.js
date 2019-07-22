// 包含应用中所有请求接口的函数
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd';
//请求登录
export const reqLogin=(username,password)=>ajax.post('/login',{username,password})
   //发送json请求得到天气信息
export const reqWeather=(city)=>{
    return new Promise((resolve,reject)=>{//执行器函数，内部去执行任务
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(error,data)=>{
         if(!error&&data.error===0){
            const {dayPictureUrl, weather} = data.results[0].weather_data[0]
            resolve({dayPictureUrl, weather})
         }else{//失败
                message.error('失败')
         }
        }) 
    
    })
}
//获取分类列表
// export const reqCategorys=()=>ajax.get('/manage/category/list');
// export const reqCategorys=()=>ajax({
//    url:'/manage/category/list'
// })
//发送get请求
export const reqCategorys=()=>ajax('/manage/category/list');
//添加分类发送post请求
export const reqAddCategory=(categoryName)=>ajax.post('/manage/category/add',{
    categoryName
});
//修改分类
export const reqUpdateCategory=({categoryId,categoryName})=>ajax.post('/manage/category/update',{
    categoryId,
    categoryName
});
//获取分页商品列表
export const reqProducts=(pageNum,pageSize)=>ajax('/manage/product/list',
{params:{//虽然写的是params但是他是query参数
    pageNum,//包含所有query参数对象，
    pageSize
}})

//根据分类id获取分类
export const reqCategory =(categoryId)=>ajax('/manage/category/info',{
    params:{
        categoryId
    }
})

//根据Name/desc搜索产品分页列表 
export const reqSearchProducts=({
    pageNum,
    pageSize,
    searchName,
    searchType //它的值是'productName'或'productDesc'
})=>ajax('/manage/product/search',{
//get请求
params:{
    pageNum,
    pageSize,
    [searchType]:searchName
}
})

//对商品进行上下架处理
export const reqUpdateStatus=( productId,status)=>ajax('/manage/product/updateStatus',{
    method:'POST',
    data:{
        productId,
        status
    }
})
//删除图片
export const reqDeleteImg=(name)=>ajax.post('/manage/img/delete',{
    name
})

//添加/修改商品
export const reqAddUpdateProduct=(product)=>ajax.post('/manage/product/'+(product._id?'update':'add'),product)
//获取所有角色列表
export const reqRoles = () => ajax('/manage/role/list')
// export const reqRoles=()=>ajax('/manage/role/list')
//添加角色
export const reqAddRole=(roleName)=>ajax.post('/manage/role/add',{
    roleName
})
//更新角色
export const reqUpdateRole=(role)=>ajax.post('/manage/role/update',role);
//获取所有用户的列表
export const reqUsers=()=>ajax('/manage/user/list')
//删除指定用户
export const reqDeleteUser=(userId)=>ajax.post('/manage/user/delete',{
    userId
})
//添加/更新用户
export const reqAddOrUpdateUser=(user)=>ajax.post('/manage/user/'+(user._id?'update':'add'),user)
   
