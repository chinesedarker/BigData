// pages/consult/consult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    InputBottom: 0,
    syas: [{
      'robot': '尊敬的用户，您好！我是AI智能机器人CoCo，我们提供学生职业生涯规划指导，资源学习共享，心理疏导等特色服务。'
    }, {
      'robot': '猜你想问：\n 1.产品经理学习资源 \n 2.如何明确目标 \n 3.学习没有动力怎么办？'
    }, {
      'robot': '您可以一句话向我提问哦'
    }],
    headLeft: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABoCAMAAAAqwkWTAAADAFBMVEUAAQIAAQIBBAUAAQIDBwgBBAUECwwAAQIGCw0DBgcIDQ4BAwMKDg8FCAgMEBEAAAEOEhMHCgoQFBUDBQUSFRYJCwwUGBgBAgIWGRoMDg8ZHBwJCgoeICAUFhUhIyIMDg0mKCchJCIlKSYtMS4vLy0tKyklIyEvHiOlIlmVN20Ao/AAovAAo/AAo/AApPEApPEAo/EAo/EAo/EApPABpe8DqO4Jq+oSreYYruT+//79/v7////5/fz3/Prx+ffs9vPm8u7f7unV7OXR8ObB8uO+8uG58eC38N61792x7tqw6Nev4NGr2MqpzsOozcKowrulyL+kyb+jzcGh08Wg2smf382f5dCe6dKe6tOe69Od7NSd7NSc69Ob6tKY6dGV6NGR5s6R5s6N5M2M48yK4sqJ4MiE38eD3sOA3MJ+2sB82r972sB82sB728F72sB72sB72r972b562L56171417131bt41bx31Lt31r141r141r131r5418N418V32Mh32c112Mpx1stw1chq09Bt0sNsz79twa9pyLlmyLxiycFayMdWycxTx8xSxs1PxdBJw9VEwtlAwN4/wN06vd03u9w0utwyudwvuN0ptN4lsuAhsOEAo/EApPEApPEApPEApPEApPABpPABpO8Cpe8Dpe8Dpe8Epe4Epe4Epe4Epe4Fpe0Gpe4Ho+wIo+wJo+wKoeoLo+oMoukNougOo+YPouQQn+ESmt4VmdkZk9Aej8gji8EnibouhbAxg6s1gaU5f58+fJdFd49OcYJcen5dZ3ltXW13UXGASXeJQXCRO3CeMWmkLWetJ2KwJGGyI2G0ImC0ImC0Il+0ImC0Il+1ImC0Il+0Il+wIl6uIl2aIlWMIU99IUhpID9bIDlDHy0+HyssHyIoHyAmHh8kHh4jHh0jHh0iHx0iHh0iHx0iHx0iHx4jIB4kIR8kIiAlIyEnJCMnJSMoJiQpJyUqJyYrKSgsKiguLSsvLSwvLy0vMS8vMi8wNDEyNzQsMi8uMzArLy0lpwtPAAAAOXRSTlMGBgYGBgYGBggHDQcVDyICMx1EElU3Zwp8aptTvrXadfH04fL+/v7+/f7+/u/t4NXCvLS8wtTf8PRBAemYAAAABnRFWHRUaXRsZQCo7tInAAAAB3RFWHRBdXRob3IAqa7MSAAAAAx0RVh0RGVzY3JpcHRpb24AEwkhIwAAAAp0RVh0Q29weXJpZ2h0AKwPzDoAAAAHdEVYdEUtbWFpbAB9CJvVAAAABHRFWHRVUkwAeKPTDwAABeZJREFUaN7tms9PG0cUx33iP+kNLpxc1jZgfhQTRVZpSA8TjEwhJFyaqGKw1Epus9gSJnHNj/Dz5KAejMFgQatWrVSFNXKjACf/DysVpQlN1RyyEp2Z3bVn7d31zlAolfwuY5Z57zNv5s13xyO7mlpb1i/dmlubXK3rV2KtrparAbW41q/IGqAG6DqANp6/PCn+wB8xUzg6Ku44AD0vIXvxjBtUwP5FB6CXuGPpZ17OzjHx/7EuaIf0K/3KC/pJ9f+lLujZRTM6cZjR+gFZo++416jodI02Ckel3+J7vJyNmeLxSfF7R/soswbhY17QIoSLWccbNgHhCh9nPwJjWefKgFKKbXOB0BAXWCRoBsJvzZ5vLidFMRr9RnzydNfs/8sQRrZZQCsQwrWaKOLIHVCxcHRho6rH7jSEKSZRTaOUZgwlnp8NgxoLicbRJCGczLOpN5oDOF/5MyeGgKndEXOVXqvQYsZtQBsxNLj9MtYCg2wssqgLcBb77LG+j5bQ6BJp8nE7OQGsQaibNqAUckkyv/gyaF3hEv7kjkF7EIyskn6T6OM++xsWbXH4JZqI1QisB0JigLUH2gmKNWhrmjgu43FagQJ9gTABoRrAA6vdEk7ODPPYM4U5cKynuztQg+nyCcg6BwkpiTsmuA4nuYg6WDjW9SGO6O02ZkMw2Loeah1tErI9BaVU7xttesR2muNFDzydHSQpjZPgPG7tkWkbxOn4gzd9RlK7IPikd7KsBNHzfhW0ynuuw3V0DwH8h7Is/xVEmZVnrxdx8FNkEsrsPuZE0pwgsjFQRP8HlYg6CE2ZJGsW1FNa5gQlsDNKSNEj3hSEHg3UJrSfkWfKW/kQ1QMB2b3DbECrpOIE4QYJ+O7wPYmolYIgBLUsg/KpR2hXFynFBZohpaBHDKJWKZcDBfLLcqfgVUGRXQ7QGnG9ra8FBr0moI+DFOithCbWJ/i0Ap/nAM1CQ0Z/HL7WMioWUUpo8+grhx/rOymWYQbtaaog4LnRjKzR7aPSANlGh1TV9enasMIMWtQ8qYiv/ILQC4LoHApAN8rivYZvE9rGddATZlBC8+xHEZXyyH0AvCiVTj4BAJV9Jx7BqYQ+descGMkygnK65xcoTgdaH1VresAAOVoD0NdGlCmIxa59ogyylCGX3SYiFvagUD5/J1FPgGeuVDq+hUTIU9ba8QrHciu57JWbFF7lfQDAp+q3miDeS0S5BU8PlY+1grvqLBG2+z1eMvBeoCVUKh3dIvu2p6ur/yE02CQjKGbwngh81KdKQlCzAeOZgbI9JlDG6Fz3cELZGhNo3+Abn7IBTcWNoBUmkJt2nTr7UwpbcaTz342kp0ygNQPoXJbPCvEhE0rhFKmgEbTIBFo1Tt3BG6QBfxek+KDOGBqPS8opfsMfVE3dwgVACCVpMnSuKIWCoiivVElXpKnqYljgn7oy60ym7FQ5qKUwg9zQzKbiknRATJLiU9DclphAechtbOWdnuQGudkkaIYblGUDJXk5MUZRXXlcbY/GTeyrmm6LF75TnTVToOglXN6KD0zs8wboOoGurhjCJtaouusFMpOge/+vqpt9wGjTDZB2tyyygr7Oc4ByyVCUFXQ3lMwxgtJzw6ikmEEADM+lWUDuKKldDhDycjsHzavX3HwgEJp3CNoU9d3IBwJA3HQCykdBDehu2No+qwWBaL4+KD8KakFj1t/4QMgEBEbz9UD5EfBvgMBI3h6UjVb6igkDSLv3rmko0CORGmXWFkT1TKZnKVDAJ3gD5BJaa3x6Q4Gm00lqnHagVKXfHK11Y/jaDN/VUU0HuXgSOkIGrZurREhZg9xDhl40CF/8eIDe4AsnLwD4RtxnBFFjHXJbgdJRY97WGfkqTVVG9OxH0xaghXKX4Xw1KOARPHhV1KbPQ5aKNNWg/HA5zII5KDNCL1AVyFHVqe+jyjKNZExBVEJbJiAH+0gFbZmmRIFGqyuTE0St0ijPKeiC1gA1QP8B6Mp+mnhlP7Zsam2+fExza9M/fvsyJzcC6AYAAAAASUVORK5CYII=',
    say: ""
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
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
    console.log(this.data.syas)
  },
  getInputValue(e) {
    this.setData({
      say: e.detail.value,
    })
  },
  converSation: function (e) {
    // console.log(this.data.say)
    let that = this
    var obj = {},
      isay = that.data.say,
      length = that.data.syas.length,
      says2 = "syas[" + length + "]",
      key = 'a6ad2d98b20744879af1f34ff165dc04' //图灵机器人的apikey
    // console.log(length) 
    obj.isay = isay;
    that.setData({
      [says2]: obj,
      inputValue: ""
    })
    console.log(that.data.syas)
    that.bottom()
    wx.request({
      url: 'https://tuling.hellosmile.xin/openapi/api?key=' + key + '&info=' + isay,
      success: function (res) {
        let obj = {}
        let length = that.data.syas.length
        // console.log(res)
        let tuling = res.data.text;
        obj.robot = tuling;
        says2 = "syas[" + length + "]",
          that.setData({
            [says2]: obj
          })
          that.bottom()
      }
    })
  },
  //滚动到底部
  bottom: function () {
    wx.createSelectorQuery().select("#bottom").boundingClientRect(function (rect) {
      wx.pageScrollTo({
        scrollTop: rect.bottom
      })
    }).exec()
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