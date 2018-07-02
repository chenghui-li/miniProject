Page({
   data:{
  
   },
   onLoad(){
     /*调用录像的api */
     this.ctx=wx.createCameraContext()
   },
   /*开始录像方法*/
   startRecord(){
     this.ctx.startRecord({
       success: function (res) { 
         console.log('startRecord');
       },
       /*fail: function (res) { },
       complete: function (res) { },*/
     })
   },

   /*停止录像方法*/
   stopRecord(){
     this.ctx.stopRecord({
       sucess:(res)=>{
          this.setData({
            src:res.tempThumbPath,
            videoSrc:res.tempVideoPath
          })
       }
     })
   }
   
})