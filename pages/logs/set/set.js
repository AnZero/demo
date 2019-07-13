// pages/logs/set/set.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userNameInput:'',
    realNameInput:'',
    nameIdInput:'',
    weixinInput:'',
    beizhuInput:'',
    touxiangUrl:'',
    jwt:'',
    base64:false,
    base64on:'',
    cur:''
  },
  onLoad:function(option){
    console.log(option)
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
              wx.request({
                url: 'https://test.atomtech.store/service/api/user/userinfo',
                header: {
                  'cookie': 'SS-VIDEO-TOKEN=' + res.data.data.jwt
                },
                method: 'get',
                success: function (res2) {
                  console.log(res2)
                  _this.setData({
                    userNameInput: res2.data.data.nickName,
                    realNameInput: '',
                    nameIdInput: '',
                    weixinInput: '',
                    beizhuInput: '',
                    touxiangUrl: res2.data.data.miniprogramViewUrl + '&SS-VIDEO-TOKEN=' + res.data.data.jwt,
                    jwt: res.data.data.jwt
                  })
                  wx.stopPullDownRefresh()
                }
              })
            
          }
        })
      }
    })
  },
  changephoto(src,str){
    console.log(src)
    this.setData({
      touxiangUrl: str,
      base64:true,
      base64on: src
    })
  },
  //选择头像
  choosephoto:function(){
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log('123',res)
        var str = res.tempFilePaths[0];
        var curstr = str.toLowerCase().split('.')
        var cur = curstr[curstr.length-1];
        _this.setData({cur:cur})
        if (!(cur in { png: 1, jpeg: 1, jpg: 1, bmp: 1 })) {
          _this.showTips("图片格式不正确！");
        } else if (res.tempFiles[0].size > 300000) {
          console.log('big', res.tempFiles[0].size)
          wx.compressImage({
            src: res.tempFilePaths[0], // 图片路径
            quality: 30000 / res.tempFiles[0].size, // 压缩质量
            success:function(res2){
              console.log(res2)
              wx.navigateTo({
                url: '../../logs/set/setpic/setpix?path=' + res2.tempFilePath
              })
              
            }
          })
        } else{
          wx.navigateTo({
            url: '../../logs/set/setpic/setpix?path=' + res.tempFilePaths[0]
          })
        }
      }
    })
  },
  //提交表单
  formSubmit: function (e) {
    console.log(e)
    var _this = this
    var pat = /^[a-zA-Z0-9_\.\u4e00-\u9fa5]+$/;
    if (!pat.test(e.detail.value.username) && e.detail.value.username != '') {
      this.showTips('请输入正确格式姓名或不填');
      return;
    }
    if (!pat.test(e.detail.value.realname) && e.detail.value.realname != '') {
      this.showTips('请输入正确格式真实姓名或不填');
      return;
    }
    if (!pat.test(e.detail.value.nameid) && e.detail.value.nameid != '') {
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
    console.log({
        "idCardNumber": e.detail.value.nameid,
        "name": e.detail.value.realname,
        "remark": e.detail.value.beizhu,
        "wechatId": e.detail.value.weixin,
        "nickName": e.detail.value.username,
        "photoUrl": this.data.touxiangUrl
      })
    wx.request({
      url: 'https://test.atomtech.store/service/api/user/userinfo?idCardNumber=' + e.detail.value.nameid + '&name=' + e.detail.value.realname + '&remark=' + e.detail.value.beizhu + '&wechatId=' + e.detail.value.weixin + '&nickName=' + e.detail.value.username ,
      data: this.data.base64 ? this.data.base64on:'',
      header: {
        // 'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'SS-VIDEO-TOKEN=' + _this.data.jwt
      },
      method: 'PUT',
      success: function (res) {
        console.log(res)
        if(res.data.code == '200'){
          _this.showTips('用户信息保存成功')
          var pages = getCurrentPages(); // 当前页面
          var beforePage = pages[pages.length - 2]; // 前一个页面
          beforePage.onLoad(); // 执行前一个页面的onLoad方法
        }
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
   * 生命周期函数--监听页面加载
   */

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