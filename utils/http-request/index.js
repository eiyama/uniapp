
  import Request from './request.js';
  const http = new Request();
  
  http.interceptor.request.use((config, cancel) => { /* 请求之前拦截器 */
  
      var appId, token;
  
      // appId = uni.getStorageSync("appId");
      // token = uni.getStorageSync("token");
  
      if (uni.getStorageSync("appId")) {
        appId = uni.getStorageSync("appId");
      }
  
      if (uni.getStorageSync("token")) {
        token = uni.getStorageSync("token");
        token = token.replace(appId + '_', '');
      }
      if (!appId) {
        store.commit(types.APPIDLOSE);
        router.replace({
          path: '/errPage',
          query: { appId: appId }
        });
      }
  
      config.headers["x-appid"] = appId;
  
      if (token) {
        token = token.replace(appId + '_', '');
      }
  
      config.headers["Authorization"] = token;
      return config;
  })
  
  
  export default http;