import store from 'store'

export default{
    // 保存user
    saveUser(user){
    // localStorage.setItem('user_key',JSON.stringify(user))
    store.set('user_key',user)
    },
    //返回一个user对象，如果没有返回一个{}
    getUser(){
      //return JSON.parse(localStorage.getItem('user_key') ||'{}')
      return  store.get('user_key')||{}
    },
    //删除保存的user
    removeUser(){
      //  localStorage.removeItem('user_key');
      store.remove('user_key');
    }
}