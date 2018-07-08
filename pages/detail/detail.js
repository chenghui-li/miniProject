Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:'查看历史记录'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.result);
    this.setData({
      img:options.img,
      name: options.name,
      info: options.distribution,
      dangerous:options.dangerous,
      ename:options.Ename
    });

    // const db = wx.cloud.database({
    //   env: 'dynamic-3a28b7'
    // })
    // db.collection('Birds').doc('swan').get({
    //    sucess:res=>{
    //      console.log(res.data);
    //    },
    //    fail:err=>{
    //      console.log(err.errCode,err.errMsg);
    //    }
    // });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /*跳转到历史记录页面 */
  historyFn() {
    //页面跳转
    wx.navigateTo({
      url: '../history/history'
    });
  }
})