
const app = getApp()
/**
 * 初始页面
 * index.js
 *  获取应用实例
 */
Page({
  data: {
    // 当前活跃的图片编号
    current: 0,
    slogan: "— 生动探索，发现未知 —",
    history: "查看历史记录",
    firstPage: true,
    timeid: '',
    camerasrc: './image/camera.png',
    cancle: false
  },
  /**
   * onReady函数：生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.slideshow();
    this.canvasTrans();
  },
  /**
   * 页面渐入渐出背景图片
   */
  slideshow() {
    let that = this;
    let query = wx.createSelectorQuery();
    let imgs = query.select('.container image');
    // 切换图片的函数
    function changeSlide() {
      let current = that.data.current
      current++;
      if (current >= 3) {
          //当索引大于3，就从0开始。
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
  /**
  *画扇形
  */
  canvasTrans() {
    let width = wx.getSystemInfoSync().windowWidth;
    this.setData({
      deviceWidth: width
    });
    this.trangle('firstCanvas', width / 2, -100, -100, 350, width + 100, 350, 0.06);
    this.trangle('secondCanvas', width / 2, 0, 0, 250, width, 250, 0.03);
    this.trangle('thirdCanvas', width / 2, 70, width / 4, 180, width * 3 / 4, 180, 0.08);
  },
  /**
   * 页面三角形变换效果
   */
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
  /**
   * 当点击按钮时，让图标slogan，三角形不显示, 画圆
   */
  start() {
    clearTimeout(this.data.timeid);
    this.setData({
      current: 3,
      firstPage: false,
      starttext: '开始您的探索',
      /*camerasrc:'./image/cancle.png',
      cancle:true,*/
    });
    this.circle(0.95 * Math.PI, 2.05 * Math.PI, false);
  },

  /**
   * 点击首页拍摄按钮，出现圆环特效
   */ 
  circle(startAngle, endAngle, dercote) {
    let ctx = wx.createCanvasContext('fourthCanvas');
    let width = this.data.deviceWidth;
    // 每次的角度偏移量，值越大速度越慢
    let xAngle = Math.PI / 180;
    // 临时角度变量
    let tmpAngle = startAngle;
    // 开启定时任务，每3s画一次，值越高速度越慢
    setInterval(rander, 3);

  /**
   * 根据每次的偏移量画圆环
   */ 
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

  /**
   * 点击拍摄按钮，进入拍摄页面
   */ 
  cameraFn() {
    var that = this;
    wx.chooseVideo({
      sourceType: ['camera'],
      maxDuration: 10,
      camera: 'back',
      success: function(res) {
        that.uploadCloudTask(res);
      }
    })
  },

  /**
   * 点击上传视频，进入选择视频上传页面
   */ 
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

  /**
   * 云端上传任务
   */ 
  uploadCloudTask(res) {
    var that = this;
    // 显示上传中
    wx.showLoading({
      title: '上传中',
    })

  /**
   * 云端初始化
   */
  wx.cloud.init({
      env: "dynamic-3a28b7",
      traceUser: true
    });

    /**
     * 上传任务
     */
    const uploadTask = wx.cloud.uploadFile({
      cloudPath: 'video' + (Math.floor(1 + Math.random() * 10000)) + '.mp4',
      filePath: res.tempFilePath, // 小程序临时文件路径
    }).then(res => {
      that.getUrl(res.fileID);
    }).catch(error => {
      // handle error
      wx.showToast({
        title: '上传失败',
        icon: 'fail',
        duration: 2000
      })
    });
  },

  /**
   * 根据得到的fileID得到相应的URL
   */ 
  getUrl(fileId) {
    let that = this;
    const getURL = wx.cloud.getTempFileURL({
      fileList: [{
        fileID: fileId
      }]
    }).then(res => {
      that.transfer(res.fileList[0].tempFileURL);
    }).catch(error => {
      // handle error
    });
  },

  /**
   * 将得到的视频URL传给后台
   */ 
  transfer(url) {
    // 通过调用 node服务器跳过微信平台时间的限制
    const requestTask = wx.request({
      method: 'POST',
      url: 'https://api.docschina.org/api/mini/video',
      data: {
        "key": url
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        let id = res.data.data.name;
        const find = wx.cloud.callFunction({
          name: 'getBirdInfo',
          data: {
            key: id,
            time: new Date().toLocaleString()
          }
        }).then(res => {
          // 做一个识别成功和失败结果的识别
          if (res.result === '' || res.result == null) {
            wx.hideLoading();
            //识别失败就传给详情页面一个result值做判断
            wx.navigateTo({
              url: '../detail/detail?result=' + null
            })
          } else {
            // 隐藏状态框
            wx.hideLoading();
            //识别成功就将得到的结果通过参数传给详情页，同时也给result赋值方便判断
            wx.navigateTo({
              url: '../detail/detail?Ename=' + res.result.Ename + '&distribution=' + res.result.distribution + '&img=' +    res.result.img + '&dangerous=' + res.result.dangerous + '&name=' + res.result.name + '&rare=' + res.result.rare + '&result=' + 'success'
            });
          }
        }).catch(error => {
          // handle error
        });
      }
    })
  },

  /**
   * 跳转到历史记录页面
   */ 
  historyFn() {
    //页面跳转
    wx.navigateTo({
      url: '../history/history'
    });
  }

})