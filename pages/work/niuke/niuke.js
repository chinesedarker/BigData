// pages/work/niuke/niuke.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'',
    loadProgress:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (url) {
    this.loadProgress()
    console.log(url)
    if(url.id==1){
      this.setData({
        url:"https://www.nowcoder.com/school/schedule/"+url.url
      })
    }else{
      this.setData({
        url:"https://www.nowcoder.com/search?query="+url.content+"&type=post"
      })
    }
  },
  // 加载
  loadProgress(){
    this.setData({
      loadProgress: this.data.loadProgress+3
    })
    if (this.data.loadProgress<100){
      setTimeout(() => {
        this.loadProgress();
      }, 100)
    }else{
      this.setData({
        loadProgress: 0
      })
    }
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