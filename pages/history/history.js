Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 云端初始化
    wx.cloud.init({
      env: "dynamic-3a28b7",
      traceUser: true
    });

    const find = wx.cloud.callFunction({
      name: 'queryDB',
      data: {

      }
    }).then(res => {
      console.log(res);
      this.setData({historyList:res.result});
      console.log('0000000'+this.data.historyList);

    }).catch(error => {
      // handle error
    });

    // const db = wx.cloud.database({
    //   env: 'dynamic-3a28b7'
    // })
    // db.collection('history').doc('_id').get({
    //    sucess:res=>{
    //      console.log(res);
    //      console.log(res.data);
    //      this.setData({
    //        /*img:res.img,
    //        name:res.name,
    //        info:res.info,
    //        website:res.website,
    //        history:res.history*/
           
    //      });
    //    },
    //    fail:err=>{
    //      console.log(err.errCode,err.errMsg);
    //    }
    // });
  },
  detailFn(){
    //页面跳转
    /*wx.navigateTo({
      url: '../detail/detail'
    });*/
  }
})