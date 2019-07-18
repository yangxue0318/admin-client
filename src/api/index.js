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