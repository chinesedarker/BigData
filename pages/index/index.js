// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: '../../images/bg1.jpg'
    }, {
      id: 1,
        type: 'image',
        url: '../../images/bg2.jpg',
    }, {
      id: 2,
      type: 'image',
      url: '../../images/bg3.jpg'
    }, {
      id: 3,
      type: 'image',
      url: '../../images/bg4.jpg'
    }],
    // 宫格列表
    iconList: [{
      icon: 'formfill',
      color: 'yellow',
      badge: 0,
      name: '就业',
      click:'gotoWork'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 2,
      name: '资讯',
      click:'gotoNews'
    }, {
      icon: 'list',
      color: 'red',
      badge: 0,
      name: '资源',
      click:'gotoResources'
    },{
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: '社区',
      click:'gotoCommunity'
    }, {
      icon: 'commentfill',
      color: 'pink',
      badge: 0,
      name: '反馈',
      click:'gotoProposal'
    }, {
      icon: 'friend',
      color: 'blue',
      badge: 0,
      name: '关于',
      click:'gotoAbout'
    }],
    gridCol:3,
    skin: false,
  },
  //资源
  gotoResources:function(){
    wx.navigateTo({
      url: '/pages/resources/resources',
    })
  },
  //关于
  gotoAbout:function(){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  //社区
  gotoCommunity:function(){
    wx.navigateTo({
      url: '/pages/community/community',
    })
  },
  //反馈
  gotoProposal:function(){
    wx.navigateTo({
      url: '/pages/proposal/proposal',
    })
  },
  //资源
  gotoWork:function(){
    wx.navigateTo({
      url: '',
    })
  },
  //资讯
  gotoNews:function(){
    wx.navigateTo({
      url: '/pages/news/news',
    })
  },
  //智能咨询
  gotoWork:function(){
    wx.navigateTo({
      url: '/pages/work/work',
    })
  },
  // 霍兰德跳转
  holland:function(){
    wx.navigateTo({
      url: '/pages/holland/index',
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