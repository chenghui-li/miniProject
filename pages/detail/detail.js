/**
 * 查看动物详情页面
 */
Page({
  /**
   * 页面的初始数据
   * 
  */
  data: {
    history : '查看历史记录'
  },

  /**
   * 生命周期函数--监听页面加载
   * @param {int} options input param
   * @return {int} res result of the func
  */
  onLoad: function(options) {
//  做一个判断，结果识别成功和失败呈现不同的效果
    if (options.result == 'null' || options.result == null) {  //识别未知生物
      this.setData({
        img : './image/unknown.jpg',
        name : '未知生物',
        info : '未识别出生物，请重试',
        dangerous : '',
        ename : ''
      });
    } 
    else {  
        //识别生物成功
      this.setData({
        img : options.img,
        name : options.name,
        info : options.distribution,
        dangerous : options.dangerous,
        ename : options.Ename
      });
    }
  },

  /**
   * 跳转到历史记录页面
   * @param {int} test input param
   * @return {int} res result of the func
  */
  historyFn() {
    //页面跳转
    wx.navigateTo({
      url: '../history/history'
    });
  }
})