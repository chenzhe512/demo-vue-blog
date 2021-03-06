import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'https://blog-server.hunger-valley.com'
axios.defaults.withCredentials = true //即使对于异步请求也带上cookie

export default function request(url,type = 'GET',data = {}){
    return new Promise((resolve,reject) => {
        let option = {
            url,
            method: type
        }
        if(type.toLowerCase() === 'get'){
            option.params = data
        }else{
            option.data = data
        }
        axios(option).then(res =>{
            console.log(res.data)
            if(res.data.status === 'ok'){
                resolve(res.data)
            }else{
                Message.error(res.data.msg)
                reject(res.data)
            }
        }).catch(err => {
            Message.error('网络异常')
            reject({ msg: '网络异常'})
        })
    })
}

/*
request('auth/login','post',{username: hunger1,password:'123456'}).then(data => {
    console.log(data)
})
*/