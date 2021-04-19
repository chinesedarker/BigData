//目前答题的标题 例如：擅长的活动
var titleIndex = 0;
//目前回答的类型 例如：A
var questionDateListIndex = 0;
//获取到的json数据
var requsetList = [];
//回答的个数
var number = 1;
//数据数组
var answerList = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    questionType: null,
    questionList: [],
    number: number,
    checkboxState: false,
    percentage: Math.round(number / 18 * 10000) / 100.00,
    waitTime: 15,
    greyClass: "margin-tb-sm text-center rightButton",
    greenClass: "margin-tb-sm text-center rightButton displayNone",
    returnClass: "margin-tb-sm text-center leftButton",
    backClass: "margin-tb-sm text-center leftButton displayNone",
    referClass: "margin-tb-sm text-center rightButton displayNone"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    console.log(app.globalData)
    if (app.globalData.name != "" && app.globalData.grade != "" && app.globalData.idCard != "" && app.globalData.phone != "") {
      wx.showToast({
        title: '审核通过',
        icon: 'none',
        duration: 1500
      })
      this.getQuestion();
    } else {
      wx.redirectTo({
        url: '../login/login',
      })
    }
  },
  // 提交数据
  referData: function () {
    var R = 10,
      A = 20,
      I = 20,
      S = 20,
      E = 30,
      C = 50;
    for (var i = 0; i < answerList.length; i++) {
      if (answerList[i] != undefined) {
        // console.log(answerList[i]);
        var answer = answerList[i].split("-");
        // console.log(answer);
        if (answer[0] == 'R') {
          R += parseInt(answer[1]);
        } else if (answer[0] == 'A') {
          A += parseInt(answer[1]);
        } else if (answer[0] == 'I') {
          I += parseInt(answer[1]);
        } else if (answer[0] == 'S') {
          S += parseInt(answer[1]);
        } else if (answer[0] == 'E') {
          E += parseInt(answer[1]);
        } else if (answer[0] == 'C') {
          C += parseInt(answer[1]);
        }
      }
    }
    console.log("成绩单：" + "R:" + R + " A:" + A + " I:" + I + " S:" + S + " E:" + E + " C:" + C)
    let resultArray0 = ["R", "A", "I", "S", "E", "C"]
    // 排序后返回对应的原数组下标
    let resultArray1 = [R, A, I, S, E, C]
    let resultArray2 = ["0", "1", "2", "3", "4", "5"]
    var len = resultArray1.length
    for (var i = 0; i < len - 1; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
        // 相邻元素两两对比，元素交换，大的元素交换到前面面
        if (resultArray1[j] < resultArray1[j + 1]) {
          var temp = resultArray1[j];
          resultArray1[j] = resultArray1[j + 1];
          resultArray1[j + 1] = temp;
          var temp2 = resultArray2[j]
          resultArray2[j] = resultArray2[j + 1]
          resultArray2[j + 1] = temp2
        }
      }
    }
    console.log("排序后的数组：" + resultArray1)
    console.log("排序后的下标：" + resultArray2)
    var result = ""+resultArray0[resultArray2[0]]+""+resultArray0[resultArray2[1]]+""+resultArray0[resultArray2[2]]+""
    console.log("前三字母" + result)
    //提交成绩给后端
    var app = getApp()
    this.setData({
      loadModal: true
    })
    wx.request({
      url: "http://47.108.210.238:8880/UserController/submit",
      method: "POST",
      data: {
        name: app.globalData.name,
        idCard: app.globalData.idCard,
        grade: app.globalData.grade,
        result:result,
        phone: app.globalData.phone,
        R:R,
        I:I,
        A:A,
        S:S,
        E:E,
        C:C
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        this.setData({
          loadModal: false
        })
        if(res==1){
          wx.redirectTo({
            url: '../grade/grade?R='+R+'&I='+I+'&A='+A+'&S='+S+'&E='+E+'&C='+C+'&result='+result,
          })
        }else{
          wx.showToast({
            title: '系统出现故障',
          })
        }
      },
    })
  },
  alertX: function () {
    console.log(123);
  },
  // 复选框被选中
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    //注意特殊情况 "undefined-0"
    answerList[number] = e.detail.value[0] + "-" + e.detail.value.length;
    console.log(answerList)
    this.setData({})
  },
  // 上一题
  backQuestion: function () {
    this.setData({
      referClass: "margin-tb-sm text-center rightButton displayNone"
    });
    // console.log("back-1当前标题" + titleIndex + "当前回答的类型" + questionDateListIndex);
    if (questionDateListIndex != 0 && questionDateListIndex < 6) {
      questionDateListIndex--;
    } else {
      titleIndex--;
      questionDateListIndex = 5;
    };
    // console.log("back-2当前标题" + titleIndex + "当前回答的类型" + questionDateListIndex);
    //检测是否为第二个问题
    if (number == 2) {
      this.setData({
        returnClass: "margin-tb-sm text-center leftButton ",
        backClass: "margin-tb-sm text-center leftButton displayNone"
      })
    }
    number--;
    // console.log(titleIndex+"&&"+questionDateListIndex);
    // 更改进度条，标题，问题列表，问题编号
    this.setData({
      title: requsetList[titleIndex].contentIndex,
      checkboxState: false,
      questionType: requsetList[titleIndex].questionDateListVos[questionDateListIndex].type,
      questionList: requsetList[titleIndex].questionDateListVos[questionDateListIndex].contentList,
      percentage: Math.round(number / 18 * 10000) / 100.00,
      number: number,
    })
    this.timing();
  },
  //下一题
  nextQuestion: function () {
    // console.log("next-1当前标题" + titleIndex + "当前回答的类型" + questionDateListIndex);
    if (questionDateListIndex < 5) {
      questionDateListIndex++;
    } else {
      titleIndex++;
      questionDateListIndex = 0;
    };
    // console.log("next-2当前标题" + titleIndex + "当前回答的类型" + questionDateListIndex);
    //检测是否为第一个问题
    if (number == 1) {
      this.setData({
        returnClass: "margin-tb-sm text-center leftButton displayNone",
        backClass: "margin-tb-sm text-center leftButton"
      })
    }
    number++;
    // console.log(titleIndex+"&&"+questionDateListIndex);
    // 更改进度条，标题，问题列表，问题编号
    this.setData({
      title: requsetList[titleIndex].contentIndex,
      checkboxState: false,
      questionType: requsetList[titleIndex].questionDateListVos[questionDateListIndex].type,
      questionList: requsetList[titleIndex].questionDateListVos[questionDateListIndex].contentList,
      percentage: Math.round(number / 18 * 10000) / 100.00,
      number: number,
    })
    if (number == 18) {
      this.timing();
      this.setData({
        greenClass: "margin-tb-sm text-center rightButton displayNone",
        referClass: "margin-tb-sm text-center rightButton"
      })
    } else {
      this.timing();
    }
  },
  //倒计时
  timing: function () {
    var that = this;
    that.setData({
      greyClass: "margin-tb-sm text-center rightButton ",
    });
    that.setData({
      greenClass: "margin-tb-sm text-center rightButton displayNone",
    });
    for (var i = 15; i > 0; i--) {
      that.setData({
        waitTime: i,
      });
      this.sleep(1000);
    }
    that.setData({
      greyClass: "margin-tb-sm text-center rightButton displayNone",
    });
    that.setData({
      greenClass: "margin-tb-sm text-center rightButton",
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
  // 获取问题列表
  getQuestion: function () {
    var that = this;
    wx.request({
      url: 'http://47.108.210.238:8880/QuestionDataVoController/getJson',
      method: "GET",
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        // console.log(res);
        requsetList = res.data.list;
        console.log("打印request获取到的数据：", requsetList);
        that.setData({
          title: requsetList[titleIndex].contentIndex,
          questionType: requsetList[titleIndex].questionDateListVos[questionDateListIndex].type,
          questionList: requsetList[titleIndex].questionDateListVos[questionDateListIndex].contentList,
        });
        //倒计时
        console.log("标题", requsetList[titleIndex].contentIndex);
        console.log("问题列表", requsetList[titleIndex].questionDateListVos[questionDateListIndex].contentList);
        that.timing();
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})