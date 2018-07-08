//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 当前活跃的图片编号
    current: 0,
    slogan: "— 生动探索，发现未知 —",
    history: "查看历史记录",
    firstPage: true,
    timeid: '',
    camerasrc: './image/camera.png',
    cancle:false
  },
  // onReady只会出现一次首页，使用onshow
  /*onShow(){
   if(!this.data.firstPage){
     this.setData({ firstPage: true, current: 0 }); 
   }
    this.slideshow();
    this.canvasTrans(); 
  },*/
  onReady() {
    this.slideshow();
    this.canvasTrans();
  },
  /*页面渐入渐出背景图片*/
  slideshow() {
    let that = this;
    let query = wx.createSelectorQuery();
    let imgs = query.select('.container image');
    // 切换图片的函数
    function changeSlide() {
      let current = that.data.current
      current++;
      if (current >= 3) {
        current = 0;
      }
      that.setData({
        current: current
      });
    }
    let timeid = setInterval(changeSlide, 1800);
    this.setData({
      timeid: timeid
    });
  },
  //画扇形
  canvasTrans(){
    let width = wx.getSystemInfoSync().windowWidth;
    this.setData({
      deviceWidth: width
    });
    this.trangle('firstCanvas', width / 2, -100, -100, 350, width + 100, 350, 0.06);
    this.trangle('secondCanvas', width / 2, 0, 0, 250, width, 250, 0.03);
    this.trangle('thirdCanvas', width / 2, 70, width / 4, 180, width * 3 / 4, 180, 0.08);
  },
  /*三角形 */
  trangle(canvansid, x1, y1, x2, y2, x3, y3, ahap) {
    var ctx = wx.createCanvasContext(canvansid);
    // 开始绘制三角
    ctx.setStrokeStyle('#ffffff');
    // 设置透明度
    ctx.setGlobalAlpha(ahap);
    //设置路径起点坐标
    ctx.moveTo(x1, y1);
    //绘制直线线段到坐标点
    ctx.lineTo(x2, y2);
    //绘制直线线段到坐标点
    ctx.lineTo(x3, y3);
    ctx.setFillStyle('white');
    ctx.fill();
    ctx.draw();
  },
  /*当点击按钮时，让图标slogan，三角形不显示,画圆 */
  start() {
    clearTimeout(this.data.timeid);
    this.setData({
      current: 3,
      firstPage: false,
      starttext: '开始您的探索',
      /*camerasrc:'./image/cancle.png',
      cancle:true,*/
    });
    this.circle(0.95 * Math.PI, 2.05 * Math.PI,false);
  },

  /* 点击取消按钮时*/
 /* cancle(){
    console.log('取消');
    this.circle( 0,  Math.PI,true);
  },*/

  /* 点击首页拍摄按钮，出现圆环特效 */
  circle(startAngle, endAngle,dercote) {
    let ctx = wx.createCanvasContext('fourthCanvas');
    let width = this.data.deviceWidth;
    /*let startAngle = 0.95 * Math.PI;
    let endAngle = 2.05 * Math.PI;*/
    // 每次的角度偏移量，值越大速度越慢
    let xAngle = Math.PI / 180;
    // 临时角度变量
    let tmpAngle = startAngle;
    // 开启定时任务，每3s画一次，值越高速度越慢
    setInterval(rander, 3);

    /* 根据每次的偏移量画圆环*/
    function rander() {
      if (tmpAngle >= endAngle) {
        return;
      } else if (tmpAngle + xAngle > endAngle) {
        tmpAngle = endAngle;
      } else {
        tmpAngle += xAngle;
      }
      ctx.setGlobalAlpha(0.3);
      ctx.arc(width / 2, 190, 120, startAngle, tmpAngle, dercote);
      ctx.setStrokeStyle('#ffffff');
      ctx.setLineWidth(100);
      ctx.stroke();
      ctx.draw();
    }
  },

  /*点击拍摄按钮，进入拍摄页面 */
  cameraFn() {
    /*wx.navigateTo({
      url: '../camera/camera'
    });*/
    var that = this;
    wx.chooseVideo({
      sourceType: ['camera'],
      maxDuration: 60,
      camera: 'back',
      success: function(res) {
       that.uploadCloudTask(res);
      }
    })
  },

  /*上传视频*/
  uploadFn() {
    var that = this;
    wx.chooseVideo({
      sourceType: ['album'],
      maxDuration: 60,
      camera: 'back',
      success: function(res) {
        that.uploadCloudTask(res);
      }

    });
  },

/*云端上传任务 */
  uploadCloudTask(res) {
    var that=this;
    console.log(res);
    // 显示上传中
    wx.showLoading({
      title: '上传中',
    })

    // 云端初始化
    wx.cloud.init({
      env: "dynamic-3a28b7",
      traceUser: true
    });

    // 上传任务
    const uploadTask = wx.cloud.uploadFile({
      cloudPath:'video' + (Math.floor(1 + Math.random() * 10000)) + '.mp4',
      filePath: res.tempFilePath, // 小程序临时文件路径
    }).then(res => {
      // get resource ID
       console.log('上传成功' + res.fileID);
      // that.saveToDB(res.fileID);
      that.getUrl(res.fileID);

    }).catch(error => {
      // handle error
      console.log('上传失败111' + error.errMsg);
      wx.showToast({
        title: '上传失败',
        icon: 'success',
        duration: 2000
      })
    });
  },


  /*将上传的视频存到数据库 */
  /*saveToDB: function(fileID) {
    const db = wx.cloud.database()
    db.collection('video').add({
      data: {
        fileID,
      }
    }).then(res => {
       console.log('保存数据库成功')
    }).catch(err => {
      this.setData({
        statusMsg: `保存到数据库失败：${err.errMsg}`,
      })
    })
  }*/

  /*根据得到的fileID得到相应的URL */
  getUrl(fileId) {
    let that = this;
    const getURL = wx.cloud.getTempFileURL({
      fileList: [{
        fileID: fileId
      }]
    }).then(res => {
      console.log('获取成功', res)
      that.transfer(res.fileList[0].tempFileURL);
    }).catch(error => {
      // handle error
      console.log('获取失败', error)
    });
    console.log(getURL);
  },

  /*将得到的视频URL传给后台，调用云函数 */
  transfer(url) {
    console.log(new Date().toLocaleString());
    console.log(url);

    // wx.request({
    //   url: '',
    //   method: 'POST'
    // });
    const transferURL = wx.cloud.callFunction({
      name: 'getBirdInfo',
      data: {
        key: url,
        /*time:new Date().toLocaleString()*/
      }
    }).then(res => {
      console.log('云函数获取成功result=', res)
      // 隐藏状态框
      wx.hideLoading();
      //页面跳转
      wx.navigateTo({
        url: '../detail/detail?result=' + res
      });
    }).catch(error => {
      // handle error
    });
  },

  /*跳转到历史记录页面 */
  historyFn(){
    //页面跳转
    wx.navigateTo({
      url: '../history/history' 
    });
  }

})