// pages/logs/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInput:'',
    rawData:{},
    signature:'',
    fwtkIsCheck:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    
        this.setData({
          rawData: options.rawData,
          signature: options.signature,
          userInput: options.nickName
        })
      
    
  },
  // 选择服务条款
  checkboxChange: function (e) {
    var fwtkArray = e.detail.value;
    var isCheck = true;
    if (fwtkArray != null && fwtkArray.length == 1 && fwtkArray[0] == 'fwtk') {
      isCheck = true;
    } else {
      isCheck = false;
    }
    this.setData({
      fwtkIsCheck: isCheck
    });
  },
  //提交表单
  formSubmit:function(e){
    console.log(e)
    var _this = this
    var pat = /^[a-zA-Z0-9_\.\u4e00-\u9fa5]+$/;
    if (!pat.test(e.detail.value.username) && e.detail.value.username != '') {
      this.showTips('请输入正确格式姓名或不填');
      return;
    }
    if (!pat.test(e.detail.value.idnum) && e.detail.value.idnum != '') {
      this.showTips('请输入正确格式证件号或不填');
      return;
    }
    if (!pat.test(e.detail.value.weixin) && e.detail.value.weixin != '') {
      this.showTips('请输入正确格式微信号或不填');
      return;
    }
    if (!pat.test(e.detail.value.beizhu) && e.detail.value.beizhu != '') {
      this.showTips('请不要输入非法字符或不填');
      return;
    }
    if (!this.data.fwtkIsCheck) {
      this.showTips('请先阅读并同意服务条款');
      return;
    }
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
            wx.request({
              url: 'https://test.atomtech.store/service/api/user/register',
              data: {
                "idCardNumber": e.detail.value.idnum,
                "name": e.detail.value.username,
                "remark": e.detail.value.beizhu,
                "wechatId": e.detail.value.weixin,
                "rawData": _this.data.rawData,
                "signature": _this.data.signature
              },
              header: {
                // 'content-type': 'application/x-www-form-urlencoded',
                'cookie': 'SS-VIDEO-TOKEN=' + res.data.data.jwt
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                _this.showTips('已成功注册！')
                var pages = getCurrentPages(); // 当前页面
                var beforePage = pages[pages.length - 2]; // 前一个页面
                wx.navigateBack({
                  success: function () {
                    beforePage.onLoad(); // 执行前一个页面的onLoad方法
                  }
                });
              }
            })
          }
        })
      }
    })
    
  },
  // 弹出提示
  showTips: function (txt) {
    wx.showToast({
      title: txt,
      icon: "none",
      duration: 2000
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