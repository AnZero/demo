//logs.js
Page({
  data: {
    logs: [],
    name:'',
    touxiang:'',
    shouquan:false,
    zhuce:false,
    show:false,
    showxt:false,
    showyh:false
  },
  onLoad: function () {
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
            if (res.data.data.userStatus != 'unregistered') {
              wx.request({
                url: 'https://test.atomtech.store/service/api/user/userinfo',
                header: {
                  'cookie': 'SS-VIDEO-TOKEN=' + res.data.data.jwt
                },
                method: 'get',
                success: function (res2) {
                  console.log(res2)
                  _this.setData({
                    touxiang : res2.data.data.miniprogramViewUrl + '&SS-VIDEO-TOKEN=' + res.data.data.jwt,
                    name : res2.data.data.nickName,
                    shouquan: true,
                    zhuce: true,
                    show:true
                  })
                  wx.stopPullDownRefresh()
                }
              })
            } else{
              _this.setData({
                zhuce:false,
                shouquan:false,
                show:true
              })
              wx.stopPullDownRefresh()
            }
          }
        })
      }
    })
  },
  getuserinfo:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../logs/login/login?rawData=' + e.detail.rawData + '&signature=' + e.detail.signature + '&nickName=' + e.detail.userInfo.nickName
    })
  },
  onPullDownRefresh: function () {
    this.onLoad()
  }
})
