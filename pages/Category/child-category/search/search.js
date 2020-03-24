// pages/Category/child-category/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showInput: function () {
      this.triggerEvent('hidden')
      this.setData({
        inputShowed: true
      });
    },
    hideInput: function () {
      this.triggerEvent('show')
      this.setData({
        inputVal: "",
        inputShowed: false
      });
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
    },
    inputTyping: function (e) {
      this.setData({
        inputVal: e.detail.value
      });
    }
  }
})
