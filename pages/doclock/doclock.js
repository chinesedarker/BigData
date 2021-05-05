// pages/doclock/doclock.js
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
    isdisabled: true,
    imgList: [],
    textArea: "",
    flagId: ""
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //最多上传图片数
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        console.log(res);
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
        console.log(this.data.imgList);

      }
    });
  },
  textareaBInput: function (e) {
    // console.log(e.detail.value)
    this.setData({
      textArea: e.detail.value
    })
  },
  //点击提交
  doPost: function (e) {
    console.log(this.data.imgList);
    if (this.data.textArea.length != 0||this.data.imgList.length!=0) {
      wx.uploadFile({
        url: 'http://47.108.210.238:8880/flag/friendCircle',
        filePath: this.data.imgList[0],
        name: 'files',
        formData: {
          'flagId': this.data.flagId,
          'text': this.data.textArea,
          "method":"POST"
        },
        header:{
          "Content-Type": "multipart/form-data"
        },
        success(res) {
          console.log(res);
          
          // wx.navigateBack({
          //   delta: 1,
          // })
          wx.navigateTo({
            url: '../community/community',
          })


          //do something
        },
        fail:function(err){
          console.log(err);
        }
      })
    } else {
      wx.showToast({
        title: '请填写完整,至少上传一张照片',
        icon: 'none',
      })
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      flagId: options.id
    })
    console.log(this.data.flagId)
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