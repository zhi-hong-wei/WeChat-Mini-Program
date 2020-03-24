// pages/Home/Home.js
import {
  getMultiData,
  getHomeGoods
} from "../../service/home.js"
const types = ['pop', 'new', 'sell']
Page({
  data: {
    banners: [],
    recommends: [],
    tabcontrol: ['流行', '新款', '精选'],
    goods: {
      'pop': {
        page: 0,
        list: []
      },
      'new': {
        page: 0,
        list: []
      },
      'sell': {
        page: 0,
        list: []
      }
    },
    currentType: 'pop',
    showtop: false,
    tabControlTop: 0,
    isFixed: false
  },
  onLoad: function(options) {
    //请求数据
    this.getMultiData()
    this._getHomeGoods('pop')
    this._getHomeGoods('new')
    this._getHomeGoods('sell')
  },
  getMultiData() {
    getMultiData().then(res => {
      //取出数据
      // console.log(res)
      const banner = res.data.banner.list
      const recommend = res.data.recommend.list
      //存放在data中
      this.setData({
        banners: banner,
        recommends: recommend
      })
    })
  },
  _getHomeGoods(type) {
    // 必须this.data.xx才行
    const page = this.data.goods[type].page + 1;
    getHomeGoods(type, page).then(res => {
      // console.log(res)
      const commodity = this.data.goods
      commodity[type].list.push(...res.data.list)
      commodity[type].page += 1
      //往data中赋值用setData，Vue中是自动赋值的
      this.setData({
        goods: commodity
      })
    })
  },

  //上拉加载更多
  onReachBottom() {
    this._getHomeGoods(this.data.currentType)
    wx.showLoading({
      title: '加载中',
    })
  },
  //监听滚动
  onPageScroll(option) {
    // console.log(option)
    const scrollTop = option.scrollTop
    //提高性能，防止频繁调用函数
    //返回顶部flag1
    const flag1 = scrollTop >= 1000
    if (flag1 != this.data.showtop) {
      this.setData({
        showtop: flag1
      })
    }
    //一定高度显示tab1
    const flag2 = scrollTop >= this.data.tabControlTop
    if (flag2 != this.data.isFixed) {
      this.setData({
        isFixed: flag2
      })
    }
  },
  //监听图片加载完成
  imageLoad() {
    //获取tabcontrol高度
    wx.createSelectorQuery().select('.tab-two').boundingClientRect((rect) => {
      // console.log(rect.top)
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  },

  tabControlClick(event) {
    // console.log(event)
    const index = event.detail.index
    this.setData({
      currentType: types[index]
    })
    // setTimeout(()=>{
      // console.log(this.selectComponent('.tab-two'));
      // this.selectComponent('.tab-one').setCurrentIndex(index)
      // this.selectComponent('.tab-two').setCurrentIndex(index)
    // },1000)
   
  },


  onShareAppMessage: function(options) {
    return {
      path: 'pages/Home/Home'
    }
  }

})