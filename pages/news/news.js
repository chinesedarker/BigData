// pages/news/news.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft:0,
    title:[],
    list:{},
    showlist:{}
  },
  // 点击打开
  gotoshow:function(e){
    let url=e.currentTarget.dataset.url
    console.log(url)
    wx.navigateTo({
      url:"./goto/goto?url="+url
    })
  },
  // 点击切换
  tabSelect(e) {
    // console.log(e.currentTarget.dataset.id)
    let index=e.currentTarget.dataset.id;
    this.setData({
      showlist:this.data.list[index].consultDateVos,
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60

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
    var that=this
    wx.request({
      url: 'https://jobvx.hellosmile.xin/consult/getAll',
      success:function(e){
        that.setData({
          list:e.data,
          showlist:e.data[0].consultDateVos
        })
        for(var i=0;i<e.data.length;i++){
          let str="title["+i+"]"
          that.setData({
            [str]:e.data[i].type,
          })
        }
        console.log(that.data.list)
        console.log(that.data.showlist)
      }
    })
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