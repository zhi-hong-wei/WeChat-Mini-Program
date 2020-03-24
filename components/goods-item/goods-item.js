// components/goods-item/goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
goodsitem:{
  //Object,大写
type:Object,
value:{}
}
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(){
      //获取iid
      const iid=this.data.goodsitem.iid
      wx.navigateTo({
        url:"/pages/Detail/Detail?iid="+iid
      })
    }
  }
})
