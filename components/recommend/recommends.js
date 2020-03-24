// components/recommend/recommends.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommend: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isload: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imageload() {
      if (!this.data.isload) {
        this.triggerEvent('imageLoad')
        //此处修改data值页面不会刷新，所以可以不用setData
        this.data.isload = true
        // this.setData({
        //   isload: true
        // })
      }
    }
  }
})