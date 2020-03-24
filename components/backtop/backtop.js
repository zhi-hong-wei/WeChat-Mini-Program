// components/backtop/backtop.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['back-top'],
  properties: {

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
    onBackTop(){
      wx.pageScrollTo({
        scrollTop: 0,
      
      })
    }
  }
})
