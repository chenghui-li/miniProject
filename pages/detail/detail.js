// 返回识别结果，展示动物详情页面

Page({
    // 页面的初始数据
  data: {
    img:'./image/1.jpg',
    name:'池鹭',
    info:'动物的基本资料',
    website:'wwww.baidu.com',
    history:'查看历史记录',
    show:false
  },
  
    // 生命周期函数--监听页面加载，得到数据后进行展示
  onLoad: function(options) {
    console.log(options.result);
    let res=options.result; //后台返回的查询结果
    console.log(res.img);
    this.setData({
      /*img:res.img,
      name:res.name,
      info:res.info,
      website:res.website,
      history:res.history*/
    });
  },

    // 跳转到历史记录页面 
  historyFn() {
    //跳转页面
    wx.navigateTo({
      url: '../history/history'
    });
  }
})