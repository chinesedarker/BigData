// pages/holland/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    videoSrc: 'https://job.hellosmile.xin/holland.mp4', // 视频
    videoCoverImg: '../../images/holland.png', // 视频封面图
    videoPlayIcon: '../../images/play.png', // 视频播放icon
    videoLockIcon: '../../images/lock.png', // 视频播放锁
  },
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  // 点击封面自定义播放按钮时触发
  bindplay() {
    let videoContext2 = wx.createVideoContext('myVideo')
    this.setData({
      isShow: false
    })
    videoContext2.play();
    console.log('play')
  },
  // 监听播放到末尾时触发
  bindended() {
    console.log('bindended')
    this.setData({
      isShow: true
    })
    this.videoContext.ended();
  },
  // 监听暂停播放时触发
  bindpause() {
    console.log('pause')
  },
  //返回上一页
  backToIndex: function () {
    wx.navigateBack({

    })
  },
  gotoLogin: function () {
    wx.navigateTo({
      url: '/pages/login/login',
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