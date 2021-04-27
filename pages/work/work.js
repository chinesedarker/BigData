// pages/work/work.js
var pagesNumber = 0;
var NKlist={};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    showList:{},
    question:""
  },
  // 查询
  Search:function(){
    var that =this
    let content =that.data.question
    that.setData({
      question:""
    })
    console.log(content)
    wx.navigateTo({
      url: './niuke/niuke?content='+content+'&type=post',
    })
  },
  // 查询内容
  question:function(e){
    console.log(e.detail.value)
    this.setData({
      question:e.detail.value
    })
  },
  //跳转
  goTourl:function(url){
    // console.log(url.currentTarget.dataset.src)
    wx.navigateTo({
      // https://www.nowcoder.com/school/schedule/
      url: './niuke/niuke?url='+url.currentTarget.dataset.src+'&id=1',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  // 获取问题列表
  getList: function () {
    var that = this;
    wx.request({
      url: 'https://www.nowcoder.com/school/schedule/data?token=&query=&typeId=0&propertyId=0&onlyFollow=false&page=' + pagesNumber + '&_=1619246420443',
      method: "GET",
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        console.log(res.data.data);
        NKlist=res.data.data,
        that.setData({
          showList:res.data.data.slice(pagesNumber,pagesNumber+10)
        })
        console.log(that.data.showList)
      },
      fail: function () {
        console.log("获取题库失败");
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
    console.log('-----触底------')
    this.setData({
      hidden:false
    })
    pagesNumber+=10
    this.setData({
      showList:NKlist.slice(0,pagesNumber),
      hidden:true
    })
    console.log(this.data.showList)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})