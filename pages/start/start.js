Page({
  //监听页面显示
  onShow: function () {
      //自动跳转到index
      setTimeout(function(){
    //页面跳转相当于	
        wx.redirectTo({
          url: '../index/index',
        })
      },3000);
    },
  })
  