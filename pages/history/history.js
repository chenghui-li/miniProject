Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList:[{img:'',name:'麻雀',time:'时间'},{img:'',name:'鸟',time:'时间2'}]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  detailFn(){
    //页面跳转
    wx.navigateTo({
      url: '../detail/detail'
    });
  }
})