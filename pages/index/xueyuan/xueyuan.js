// pages/index/xueyuan/xueyuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
    index:0,
    cookie:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.login({
      success: res => {
        console.log(res, this)
        var _this = this
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://test.atomtech.store/service/api/user/login',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'post',
          success: function (res) {
            console.log(res, this)
            
            //xueyuan
            wx.request({
              url: 'https://test.atomtech.store/service/api/excellents/list',
              method: 'GET',
              header: {
                'cookie': 'SS-VIDEO-TOKEN=' + res.data.data.jwt
              },
              success: function (res3) {
                console.log(res3)

                _this.setData({
                  'imgUrls': res3.data.data.list,
                  'cookie': '&SS-VIDEO-TOKEN=' + res.data.data.jwt,
                  'index':options.index
                })

              }
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})