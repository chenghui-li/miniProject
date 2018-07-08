Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'./image/1.jpg',
    name:'池鹭',
    info:'一直内疚卡都吃饭好副本成就撒不错v空间啊是出库成本挂错不该是吃吧看',
    website:'wwww.baidu.com',
    history:'查看历史记录',
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.result);
    let res=options.result;
    console.log(res.img);
    this.setData({
      /*img:res.img,
      name:res.name,
      info:res.info,
      website:res.website,
      history:res.history*/
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