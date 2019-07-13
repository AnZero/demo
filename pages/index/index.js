//index.js
//获取应用实例

Page({
  data: {
    imgUrls: [],
    imgdata:[],
    autoplay: true,
    interval: 4000,
    duration: 500,
    circular: true,
    currentSwiper: 0,
    cookie:''
  },
  //事件处理函数
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
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
            //banner
            wx.request({
              url: 'https://test.atomtech.store/service/api/banner/list',
              method: 'GET',
              header: {
                'cookie': 'SS-VIDEO-TOKEN=' + res.data.data.jwt
              },
              success: function (res2) {
                console.log(res2)
                
                  _this.setData({
                    'imgdata': res2.data.data.list,
                    'cookie': '&SS-VIDEO-TOKEN=' + res.data.data.jwt
                  })
                wx.stopPullDownRefresh()
              }
            })
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
  onPullDownRefresh:function(){
    this.onLoad()
  }
})
