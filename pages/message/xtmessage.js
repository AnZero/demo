// pages/xtmessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    cookie:'',
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
            //系统消息
            wx.request({
              url: 'https://test.atomtech.store/service/api/publicmessage/list',
              method: 'GET',
              header: {
                'cookie': 'SS-VIDEO-TOKEN=' + res.data.data.jwt
              },
              data:{
                start:0,
                limit:10
              },
              success: function (res2) {
                console.log(res2)

                _this.setData({
                  'list': res2.data.data.list,
                  'cookie': '&SS-VIDEO-TOKEN=' + res.data.data.jwt
                })
                wx.stopPullDownRefresh()
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
    this.onLoad()
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