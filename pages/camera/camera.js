//index.js
//获取应用实例
const app = getApp()

Page({
   data:{
    //  tempThumbPath: "", // 录制视频的临时缩略图地址
    //  tempVideoPath: "", // 录制视频的临时视频地址
     ctx: {},
     time: 0,
   },
   onLoad(){
     /*调用录像的api */
     this.ctx = wx.createCameraContext()
   },
  
  /*当点击按钮时，开始拍摄 */
  action() {
    let { ctx, startRecord } = this.data;
      console.log("开始录视频");
      // this.setData({
      //   startRecord: true
      // });
      //   // 10秒倒计时
      // let t1 = 0;
      // let timeLoop = setInterval(() => {
      //   t1++;
      //   this.setData({
      //     time: t1,
      //   })
      //   // 最长录制10秒
      //   if (t1 == 10) {
      //     clearInterval(timeLoop);
      //     this.stopRecord(ctx);
      //   }
      // }, 1000);
      // this.setData({
      //   timeLoop
      // })
      // // 开始录制
      // ctx.startRecord({
      //   success: (res) => {
      //     console.log(res);
      //   },
      //   fail: (e) => {
      //     console.log(e);
      //   }
      // })
      this.ctx.startRecord({
        success: function (res) {
          console.log('成功！')
          console.log(res)
        },
        fail: function (res) {
          console.log('失败！')
          console.log(res)
        },
        complete: function (res) {
          console.log('complete！')
          console.log(res)
        },
        timeoutCallback: function (res) {
          console.log('超时')
          console.log(res)
        }
      })
  },



  //  /*开始录像方法*/
  //  startRecord(){
  //    this.ctx.startRecord({
  //      success: function (res) { 
  //        console.log('startRecord');
  //      },
  //      /*fail: function (res) { },
  //      complete: function (res) { },*/
  //    })
  //  },

  //  /*停止录像方法*/
  //  stopRecord(){
  //    this.ctx.stopRecord({
  //      sucess:(res)=>{
  //         this.setData({
  //           src:res.tempThumbPath,
  //           videoSrc:res.tempVideoPath
  //         })
  //      }
  //    })
  //  }
   
})