import {getToken,setToken,getUser,setUserremoveToken}from '@/utils/auth'
import{login,getUserInfo,logout} from '../../api/login'
import { removeToken } from '../../utils/auth';


const user={
    state:{
        token:getToken(),//getToken()作为token初始值，解决刷新页面之后token 为Null
        user:getUser()

    },
    mutations:{
        SET_TOKEN(state,token){
            state.token=token  
            setToken (token)
        },
        SET_USER(state,user){
            state.user=user
            setUser(user)
        },

    },
    //业务逻辑
    actions:{
        Login({commit},form){
            //resolve触发成功处理  reject触发异常处理
         return   new Promise((resolve,reject)=>{         
            login(form.username.trim(),form.password).then(res=>{
                const resp=res.data//获取到的就是响应的data数据
                commit('SET_TOKEN',resp.data.token)
                //通知组件已经将token更新成功
                resolve(resp) 
            }).catch((e)=>{
                //出现异常
                reject(e)
            })
        })
        },
        //通过token获取用户信息
        GetUserInfo({commit,state}){
            return new Promise((resolve,reject)=>{
                getUserInfo(state.token),then(res=>{
                    const respUser=res.data
                    commit('SET_USER',respUser.data)
                    resolve(respUser)
                }).catch((e)=>{
                    reject(e)
                })
            })
            
        },
        //退出
        Logout({commit,state}){
            return new Promise((resolve,reject)=>{
                logout(state.token).then((res)=>{
                    const resp=res.data
                    commit('SET_TOKEN','')
                    commit('SET_USER',null)
                    removeToken()
                    resolve(resp)
                }).catch((e)=>{
                    reject(e)
                })
            })
        }
    }

}
export default user