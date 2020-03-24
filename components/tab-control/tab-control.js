// pages/components/tabControl/tabControl.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /*   tabControl(index) {
        this.currentIndex = index;
        this.('tabClick', index) 
      } */
    tabControl(event) {
    // console.log(event)都是传过来的index，所以要打印找到其位置
      const index = event.currentTarget.dataset.index
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('item-click', { index}) //必传{index}
      },
       //此处有bug，调用不起setCurrentIndex（index）方法
    setCurrentIndex(index) {
      console.log(index)
      this.setData({
        currentIndex: index
      })
    }
  }
})