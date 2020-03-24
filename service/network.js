export default function(options) {
  wx.showLoading({
    title: '数据加载中',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://106.54.54.237:8000/api/wh'+options.url,
      timeout: 5000,
      data: options.data,
      success: function(res) {
        resolve(res.data)
      },
      fail: reject,
      //隐藏“加载中”图标
      complete: res => {
        wx.hideLoading()
      }
    })
  })
}