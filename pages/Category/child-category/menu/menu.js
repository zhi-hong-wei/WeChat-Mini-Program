// pages/Category/child-category/menu/menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击时也要打印数据，查看此时的index
    onItemClick(e) {
      // console.log(e)
      const index = e.currentTarget.dataset.index;
      this.setData({
        currentIndex:index
      })
      this.triggerEvent('menuclick', { index }, {})

    }
  }
})
