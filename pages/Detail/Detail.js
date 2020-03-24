// pages/Detail/Detail.js
import {
  getDetail,
  getRecommend,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo
} from "../../service/detail.js"

var util = require("../../utils/util.js")

// 获取到小程序全局唯一的App实例,用于购物车存储。
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    iid: '',
    topImage: [],
    baseInfo: {},
    commentInfo: {},
    shopInfo: {},
    paramInfo: {},
    detailInfo: {},
    recommend: {},
    showtop: false,
    time: "",
    date: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //1.保存iid,网络请求有参数的，先保存参数
    this.setData({
      iid: options.iid
    })
    //2.1获取商品数据
    this._getDetailData()
    //3.1获取推荐数据
    this._getRecommend()
    //时间戳,没起作用bug
    var TIME = util.formatTime(new Date());
    this.setData({
      time: TIME,
    });
    var DATE = util.formatDate(new Date());
    this.setData({
      date: DATE,
    });
  },
  _getDetailData() {
    getDetail(this.data.iid).then(res => {
      // console.log(res)
      const resdata = res.result;
      //获取轮播图数据,const不能少
      const topImg = resdata.itemInfo.topImages
      // 2.创建BaseInfo对象
      const baseInfo = new GoodsBaseInfo(resdata.itemInfo, resdata.columns, resdata.shopInfo.services)
      // 3.创建ShopInfo对象
      const shopInfo = new ShopInfo(resdata.shopInfo);
      // 4.获取评论信息,此处赋值为空，所以用let，如果在if中定义const，是无效的
      let commentInfo = {}
      if (resdata.rate && resdata.rate.cRate > 0) {
        commentInfo = resdata.rate.list[0]
      }
      // 5.创建ParamInfo对象
      const paramInfo = new ParamInfo(resdata.itemParams.info, resdata.itemParams.rule)
      // 6.获取detailInfo信息
      const detailInfo = resdata.detailInfo;

      this.setData({
        topImage: topImg,
        baseInfo: baseInfo,
        commentInfo: commentInfo,
        shopInfo: shopInfo,
        paramInfo: paramInfo,
        detailInfo: detailInfo
      })
    })
  },
  _getRecommend() {
    getRecommend().then(res => {
      console.log(res)
      const data = res.data;
      this.setData({
        recommend: data.list
      })
    })
  },
  // 使用scroll方法也可监听，option.detail.scrollTop
  onPageScroll(option) {
    // console.log(option)
    const scrollTop = option.scrollTop
    //提高性能，防止频繁调用函数
    //回到顶部flag1
    const flag1 = scrollTop >= 1000
    if (flag1 != this.data.showtop) {
      this.setData({
        showtop: flag1
      })
    }
  },
  addcart() {
    // 1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImage[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;


    // 2.加入到购物车列表
    app.addToCart(obj)

    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  }
})