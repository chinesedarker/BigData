// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: "",
    state: ["", "", "bg-grey", ""],
    waitTime: "",
  },
  //form提交
  formSubmit: function (e) {
    console.log(e.detail.value)
    let formData = e.detail.value
    // 判断数据长度是否正确
    if (formData.name.length >= 2 && formData.SFZ.length == 18 && formData.phone.length == 11 && formData.code.length == 4) {
      // 判断姓名和身份证是否正确
      if (this.data.state[0] == "cuIcon-roundcheckfill text-green" && this.data.state[1] == "cuIcon-roundcheckfill text-green") {
        // 判断手机号是否正规
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (!myreg.test(formData.phone)) {
          this.setData({
            loadModal: true
          })
          wx.showToast({
            title: '手机号有误！\r\n请检查后重新提交',
            icon: 'none',
            duration: 1500
          })
        } else {
          this.setData({
            loadModal: true
          })
          this.sleep(1000);
          wx.request({
            url: "http://47.108.210.238:8880/UserController/login",
            method: "POST",
            data: {
              username: formData.name,
              idCard: formData.SFZ,
              phone: formData.phone,
              code: formData.code
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: (res) => {
              console.log(res.data)
              this.setData({
                loadModal: false
              })
              res.data = 1;
              if (res.data == 0 || res.data == -1) {
                wx.showToast({
                  title: '手机验证码有误',
                  icon: 'none',
                  duration: 1500
                })
              } else if (res.data == 1) {
                var app = getApp()
                app.globalData.name = formData.name,
                  app.globalData.idCard = formData.SFZ,
                  app.globalData.phone = formData.phone,
                  app.globalData.grade = res.data,
                  wx.redirectTo({
                    url: '../question/index',
                  })
              }
            }
          })
        }
      } else {
        wx.showToast({
          title: '信息填写有误\r\n请检查后重新提交',
          icon: 'none',
          duration: 1500
        })
      }
    } else {
      wx.showToast({
        title: '信息填写有误\r\n请检查后重新提交',
        icon: 'none',
        duration: 1500
      })
    }
  },
  //输入身份证
  getSFZ: function (e) {
    let state0 = "state[1]"
    console.log(e.detail.value.length)
    if (e.detail.value.length == 18) {
      if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(e.detail.value))) {
        this.setData({
          [state0]: "cuIcon-warnfill text-orange"
        })
      } else {
        this.setData({
          [state0]: "cuIcon-roundcheckfill text-green"
        })
      }
    } else {
      this.setData({
        [state0]: "cuIcon-warnfill text-orange"
      })
    }
  },
  //输入姓名
  getname: function (e) {
    const chinese = /[^\u4E00-\u9FA5]/g
    let state0 = "state[0]"
    if (e.detail.value.length >= 2) {
      if ((chinese.test(e.detail.value))) {
        wx.showToast({
          title: "只允许输入中文",
          icon: "none"
        });
        this.setData({
          [state0]: "cuIcon-warnfill text-orange"
        })
      } else {
        this.setData({
          [state0]: "cuIcon-roundcheckfill text-green"
        })
      }
    } else {
      this.setData({
        [state0]: "cuIcon-warnfill text-orange"
      })
    }
  },
  // 输入手机号
  mobileInput: function (e) {
    let value = e.detail.value.replace(/\D/g, '')
    let state2 = "state[2]"
    let state3 = "state[3]"
    this.setData({
      mobile: value
    })
    if (value.length == 11) {
      this.setData({
        [state2]: "bg-green",
        [state3]: "verifyCode"
      })
    } else {
      this.setData({
        [state2]: "bg-grey",
        [state3]: ""
      })
    }
  },
  //点击获取验证码
  verifyCode: function () {
    console.log("获取到的电话号%s", this.data.mobile)
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (this.data.mobile.length == 0) {
      wx.showToast({
        title: '手机号为空',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (this.data.mobile.length < 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(this.data.mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else {
      wx.showToast({
        title: '发送成功',
        icon: 'success',
        duration: 1500
      })
      console.log("正在发送短信验证码...")
      wx.request({
        url: "http://47.108.210.238:8880/UserController/check",
        method: "POST",
        data: {
          phone: this.data.mobile
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: (res) => {
          console.log(res.data.code)
        }
      })
      this.timing()
    }
  },
  //倒计时
  timing: function () {
    let that = this;
    let state2 = "state[2]"
    let state3 = "state[3]"
    that.setData({
      [state2]: "bg-grey",
      [state3]: "",
    });
    for (var i = 60; i > 0; i--) {
      that.setData({
        waitTime: i + "s",
      });
      this.sleep(1000);
    }
    that.setData({
      waitTime: "",
      [state2]: "bg-green",
      [state3]: "verifyCode",
    });
  },
  //延时函数
  sleep: function (numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
      now = new Date();
      if (now.getTime() > exitTime)
        return;
    }
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