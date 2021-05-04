// pages/talk/talk.js
const app = getApp();
Page({
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    circleId: '',
    textArea: '',
    flag: false,
    index: null,
    //用户
    userName: '',
    userTime: '',
    userContent: '',
    //评论
    plName: '',
    plTime: '',
    plContent: '',
    plA: [],
    plB: [],
    Url: 'http://47.108.210.238:8880',
    content: {}
  },
  textareaBInput: function (e) {
    // console.log(e.detail.value)
    this.setData({
      textArea: e.detail.value
    })
    console.log(textArea);

  },
  inputs: function (e) {
    //输入内容
    var value = e.detail.value;
    // 获取输入框内容的长度   
    this.setData({
      textArea: value
    });
  },
  sendmes: function (e) {
    var that = this;
    var app = getApp();
    wx.request({
      url: 'http://47.108.210.238:8880/flag/comment',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        userId: app.globalData.userid,
        circleId: that.data.circleId,
        content: that.data.textArea
      },
      success: function (res) {
        wx.showToast({
          title: '评论成功',
          icon: 'none',
        })
        that.refer()
        that.setData({
          textArea: ''
        })

      }
    })
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    console.log(options);
    var index = (app.globalData.tuijianlist.length - 1) - options.index
    console.log(app.globalData.tuijianlist)
    that.setData({
      //获取推荐id
      circleId: options.id,
      index: options.index,
      content: app.globalData.tuijianlist[index]
    })
    // console.log(that.data.content)
    //开始的评论内容
    that.refer()
  },
// 刷新评论
refer:function(){
  var that=this
  wx.request({
    url: 'http://47.108.210.238:8880/flag/getComment',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: 'POST',
    data: {
      circleId: that.data.circleId
    },
    success: function (e) {
      let newArr = e.data;
      let a = []

      for (let index = 0; index < newArr.length; index++) {
        let newArray = newArr[index];
        // a.push(newArray.list['0'])
        a.push(newArray)
      }
      // console.log(a);
      // console.log(b);
      that.setData({
        plA: a
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