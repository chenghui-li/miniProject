// 历史记录页面：展现查询历史记录

Page({

  /**
   * 页面的初始数据
   *
  */
  data: {
    historyList:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   *
  */
  onLoad: function (options) {
    // 云端初始化
    wx.cloud.init({
      env: "dynamic-3a28b7",
      traceUser: true
    });

  /**
   * 调用腾讯云中的queryDB函数方法查询历史记录
   */
    const find = wx.cloud.callFunction({
      name: 'queryDB',
      data: {}
    }).then(res => {
      console.log(res);
      this.setData({historyList:res.result});
    }).catch(error => {
      // handle error
    });
  },
})