/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request';
/**
 * 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
  // requestType: 'form',
});
/*

/!**
 * 所以请求拦截器
 *!/
request.interceptors.request.use((url, options): any => {
  return {
    url,
    options: {
      ...options,
    },
  };
});

/!**
 * 所有响应拦截器
 *!/
request.interceptors.response.use(async (response, options): Promise<any> => {
  console.log("进入了全局响应拦截器")
  return response;
});
*/

export default request;
