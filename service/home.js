import request from "./network.js"
export function getMultiData() {
  return request({
    url: '/home/multidata'
  })
} 
export function getHomeGoods(type, page) {
  // 1.网络请求，商品列表数据，接口链接有type和page参数要传
  return request({
    url: '/home/data',
    //这里不是params是data
    data: {
      type,
      page
    }
  })
}