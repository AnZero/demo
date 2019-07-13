// components/banner/banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgdata: {            // 属性名
      type: Object,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: ''     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    cookie:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgdata: [],
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,
    currentSwiper: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange: function (e) {
      this.setData({
        currentSwiper: e.detail.current
      })
    },
  }
})
