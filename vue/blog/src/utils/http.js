/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 15:25:33
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-24 14:54:29
 */ 
import request from './request'

const http ={
    /**
     * methods: 请求
     * @param url 请求地址 
     * @param params 请求参数
     */
    get(url,params){
        const config = {
            method: 'get',
            url:url
        }
        if(params) config.params = params
        return request(config)
    },
    post(url,params,header){
        const config = {
            method: 'post',
            url:url
        }
        if(params) config.data = params;
        config.header = header;
        return request(config)
    },
    put(url,params){
        const config = {
            method: 'put',
            url:url
        }
        if(params) config.data = params
        return request(config)
    },
    delete(url,params){
        const config = {
            method: 'delete',
            url:url
        }
        if(params) config.params = params
        console.log(config)
        return request(config)
    }
}
//导出
export default http
