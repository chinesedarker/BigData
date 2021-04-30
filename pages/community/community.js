// pages/community/community.js
var util = require('../../utils/util.js')
var timestamp = Date.parse(new Date());
timestamp = timestamp / 1000;
//获取当前时间
var n = timestamp * 1000;
var date = new Date(n);
//年
var Y = date.getFullYear();
//月
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//日
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
//时
var h = date.getHours();
//分
var m = date.getMinutes();
//秒
var s = date.getSeconds();
var DATE = Y + '-' + M + '-' + D


const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    isShow: true,
    // StatusBar: app.globalData.StatusBar,
    // CustomBar: app.globalData.CustomBar,
    //公公页数据
    item: 0,
    tab: 0,
    //create
    dayList: ["", "", "", "", ""],
    moneyList: ["", "", "", "", "", ""],
    min: 1, //最少字数
    max: 38, //最多字数
    textArea: "",
    daymoney: null,
    weekcount: 0,
    weekContinuity: 0,
    day: null,
    number: 0,
    //clock
    jsonData: {},
    DATE: DATE,
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],

    // TabCur: 0,
    // scrollLeft:0
  },
  todoclock: function (res) {
    console.log(res);

    wx.navigateTo({
      url: '../doclock/doclock?id=' + res.currentTarget.id,
    })
  },
  //坚持天数点击变黄
  dayYellow: function (e) {
    let day = "dayList[" + e.currentTarget.dataset.day + "]";
    let Day = e.target.dataset.ay;
    this.setData({
      dayList: ["", "", "", "", "", ""],
      [day]: "dayYellow",
      day: Day
    })
    app.globalData.day = this.data.day
  },


  switchFun: function () {
    this.setData({
      isShow: true,
      number: 0
    })
  },
  switchTwoFun: function () {
    this.setData({
      isShow: false,
      number: 1
    })
  },
  // 自定义
  changeDay: function (e) {
    let day = e.detail.value;
    this.setData({
      day: day
    })
  },
  changeMoney: function (e) {
    let money = e.detail.value;
    this.setData({
      daymoney: money
    })
  },
  // 挑战金点击变黄
  moneyYellow: function (res) {
    console.log(res)
    // console.log(res.currentTarget.dataset.id)
    let str = "moneyList[" + res.currentTarget.dataset.id + "]";

    this.setData({
      daymoney: res.target.dataset.money,
      moneyList: ["", "", "", "", "", ""],
      [str]: "moneyYellow"
    })
  },
  //提示输入字数
  inputs: function (e) {
    //输入内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    if (len > this.data.max) return;
    this.setData({
      currentWordNumber: len,
      textArea: value
    });
  },
  weekcount: function (e) {
    let count = e.detail.value;
    this.setData({
      weekcount: count
    })
  },
  weekContinuity: function (e) {
    let continuity = e.detail.value;
    this.setData({
      weekContinuity: continuity
    })
  },
  // tabSelect(e) {
  //   this.setData({
  //     TabCur: e.currentTarget.dataset.id,
  //     scrollLeft: (e.currentTarget.dataset.id-1)*60
  //   })
  // },
  changeItem: function (e) {
    this.setData({
      item: e.target.dataset.item
    })
  },
  changeTab: function (e) {
    this.setData({
      tab: e.detail.current
    })
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  getNewDay: function (dateTemp, days) {
    var dateTemp = dateTemp.split("-");
    var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式  
    var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
    var rDate = new Date(millSeconds);
    var year = rDate.getFullYear();
    var month = rDate.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var date = rDate.getDate();
    if (date < 10) date = "0" + date;
    return (year + "-" + month + "-" + date);
  },
  post: function (e) {
    var that = this;
    var endDayTime = this.getNewDay(DATE, this.data.day); //结束时间
    var endWeekTime = this.getNewDay(DATE, this.data.weekContinuity * 7)
    console.log(endWeekTime);
    console.log(this.data.textArea)
    console.log(this.data.day);
    console.log(this.data.daymoney);
    console.log(date);
    console.log(DATE);

    if (this.data.number == 0) {
      //每天
      if (this.data.textArea.length == 0 || this.data.day == null) {
        wx.showToast({
          title: '请填写完整',
          icon: 'none',
        })
      } else {
        console.log(app.globalData.userid)
        //每天的接口
        wx.request({
          url: 'http://47.108.210.238:8880/flag/createFlag',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          data: {
            flagName: this.data.textArea,
            userId: app.globalData.userid,
            money: this.data.daymoney,
            startTime: DATE,
            endTime: endDayTime,
            flagCount: this.data.day
          },
          success: function (res) {
            console.log(res);
            that.setData({
              textArea: "",
              dayList: ["", "", "", "", ""],
              moneyList: ["", "", "", "", "", ""],
              weekcount: 0,
              weekContinuity: 0
            })
            if (res.data == 1) {
              wx.showToast({
                title: '提交成功',
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: '提交失败',
                icon: 'none'
              })
            }
          }
        })
      }
    } else {
      if (this.data.weekcount == 0 || this.data.weekContinuity == 0) {
        wx.showToast({
          title: '请填写完整',
          icon: 'none',
        })
      } else {
        //每周接口
        wx.request({
          url: 'https://jobvx.hellosmile.xin/flag/createFlag',
          method: 'POST',
          dataType: "json",
          data: {
            userid: app.globalData.userid,
            flag_name: this.data.textArea,
            money: this.data.daymoney,
            end_time: endWeekTime,
            flagCount: weekcount
          },
        })
      }

    }



    // console.log(this.data.weekmoney);

    // console.log(this.data.textArea)
    // wx.request({
    //   url: 'url',
    //   method:'POST',
    //   data:{},
    // })
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },



  // isCard(e) {
  //   this.setData({
  //     isCard: e.detail.value
  //   })

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var TIME = util.formatTime(new Date());
    var DATE = util.formatDate(new Date());
    this.setData({
      time: TIME,
      date: DATE,

    })
    console.log(date);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this

    wx.request({
      url: 'https://jobvx.hellosmile.xin/flag/clock',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        userId: app.globalData.userid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          jsonData: res.data
        })
        console.log(that.data.jsonData)
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