export default {
    namespaced:true,
    state:{
        userinfo:{
            user:'',
            token:''
        }
    },
    mutations:{
        setUser(state,payload){
            state.userinfo =payload
        }
    },
    actions:{
        //请求登录的网络请求 
        
    }
}