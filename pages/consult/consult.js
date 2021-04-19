// pages/consult/consult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    InputBottom: 0,
    syas: [{
      'robot': '尊敬的用户，您好！我是AI智能机器人CoCo，我们提供学生职业生涯规划指导，资源学习共享，心理疏导等特色服务。'
    }, {
      'robot': '猜你想问：\n 1.产品经理学习资源 \n 2.如何明确目标 \n 3.学习没有动力怎么办？'
    }, {
      'robot': '您可以一句话向我提问哦'
    }],
    headLeft: '../../images/robot.png',
    say: ""
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.syas)
  },
  getInputValue(e) {
    this.setData({
      say: e.detail.value,
    })
  },
  converSation: function (e) {
    // console.log(this.data.say)
    let that = this
    var obj = {},
      isay = that.data.say,
      length = that.data.syas.length,
      says2 = "syas[" + length + "]",
      key = 'a6ad2d98b20744879af1f34ff165dc04' //图灵机器人的apikey
    // console.log(length) 
    obj.isay = isay;
    that.setData({
      [says2]: obj,
      inputValue: ""
    })
    console.log(that.data.syas)
    that.bottom()
    wx.request({
      url: 'http://www.tuling123.com/openapi/api?key=' + key + '&info=' + isay,
      success: function (res) {
        let obj = {}
        let length = that.data.syas.length
        // console.log(res)
        let tuling = res.data.text;
        obj.robot = tuling;
        says2 = "syas[" + length + "]",
          that.setData({
            [says2]: obj
          })
          that.bottom()
      }
    })
  },
  //滚动到底部
  bottom: function () {
    wx.createSelectorQuery().select("#bottom").boundingClientRect(function (rect) {
      wx.pageScrollTo({
        scrollTop: rect.bottom
      })
    }).exec()
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