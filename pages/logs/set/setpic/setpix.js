// pages/logs/set/setpic/setpix.js
import WeCropper from '../../../logs/set/croppor/croppor.js'

const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const height = device.windowHeight

Page({
  data: {
    cropperOpt: {
      id: 'cropper', // 用于手势操作的canvas组件标识符
      targetId: 'targetCropper', // 用于用于生成截图的canvas组件标识符
      pixelRatio: device.pixelRatio, // 传入设备像素比
      width,  // 画布宽度
      height, // 画布高度
      scale: 1, // 最大缩放倍数
      zoom: 8, // 缩放系数
      cut: {
        x: (width - 200) / 2, // 裁剪框x轴起点
        y: (width - 200) / 2, // 裁剪框y轴期起点
        width: 200, // 裁剪框宽度
        height: 200 // 裁剪框高度
      }
    }
  },
  onLoad(option) {
    console.log(option)
    const { cropperOpt } = this.data

    this.cropper = new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
      })
    this.uploadTap(option.path)
  },
  touchStart(e) {
    this.cropper.touchStart(e)
  },
  touchMove(e) {
    this.cropper.touchMove(e)
  },
  touchEnd(e) {
    this.cropper.touchEnd(e)
  },
  uploadTap(src) {
    this.cropper.pushOrign(src)
  },
  getCropperImage() {
    this.wecropper.getCropperImage((tempFilePath) => {
      // tempFilePath 为裁剪后的图片临时路径
      if (tempFilePath) {
        wx.getFileInfo({
          filePath: tempFilePath,
          success(res){
            console.log(res.size)
            if (res.size>300000){
              wx.compressImage({
                src: tempFilePath, // 图片路径
                quality: 30000 / res.size, // 压缩质量
                success: function (res2) {
                  console.log(res2.tempFilePath)
                  var str = res2.tempFilePath;
                  var curstr = str.toLowerCase().split('.')
                  var cur = curstr[curstr.length - 1];

                  var base64 = wx.getFileSystemManager().readFileSync(tempFilePath, 'base64')
                  var pages = getCurrentPages(); // 当前页面
                  var beforePage = pages[pages.length - 2]; // 前一个页面
                  wx.navigateBack({
                    success: function () {
                      beforePage.changephoto(base64,str); // 执行前一个页面的onLoad方法
                    }
                  });

                }
              })
            }else{
              var str = tempFilePath;
              var curstr = str.toLowerCase().split('.')
              var cur = curstr[curstr.length - 1];

              var base64 = wx.getFileSystemManager().readFileSync(tempFilePath, 'base64')
              var pages = getCurrentPages(); // 当前页面
              var beforePage = pages[pages.length - 2]; // 前一个页面
              wx.navigateBack({
                success: function () {
                  beforePage.changephoto(base64,str); // 执行前一个页面的onLoad方法
                }
              });
            }
            
          }
        })
        
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },
  returnTap(){
    wx.navigateBack({
      delta: 1
    })
  }
})