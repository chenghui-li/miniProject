//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  // 当前活跃的图片编号
   current:0,
   slogan:"— 生动探索，发现未知 —",
   history:"查看历史记录",
   firstPage:true,
   timeid:''
  },
  // onReady只会出现一次首页，使用onshow
  onShow(){
    if(!this.data.firstPage){
      this.setData({firstPage:true,current:0});
    }
   this.slideshow();
   this.canvasTrans();
  },
  /*页面渐入渐出背景图片*/
  slideshow(){
    let that=this;
    let query = wx.createSelectorQuery();
    let imgs=query.select('.container image');
    // 切换图片的函数
    function changeSlide(){
      let current = that.data.current
      current++;
      if(current>=3){
        current=0;
      }
      that.setData({current:current});
    }
   let timeid=setInterval(changeSlide,2500);
   this.setData({timeid:timeid});
  },
  canvasTrans(){
    let width = wx.getSystemInfoSync().windowWidth;
    this.setData({deviceWidth:width});
    this.trangle('firstCanvas',width/2, -100, -100, 350, width+100, 350,0.06);
    this.trangle('secondCanvas', width/2, 0, 0, 250, width, 250,0.03);
    this.trangle('thirdCanvas', width/2, 70, width/4, 180, width*3/4, 180,0.08);
  },
  /*三角形 */
  trangle(canvansid,x1,y1,x2,y2,x3,y3,ahap){
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
  start(){
    clearTimeout(this.data.timeid);
    this.setData({current:3,firstPage:false,starttext:'开始您的探索'});
    this.circle();
  },

  /* 画圆形 */
  circle(){
    let ctx=wx.createCanvasContext('fourthCanvas');
    let width =this.data.deviceWidth;
    let startAngle = 0.9 * Math.PI;
    let endAngle = 2.1 * Math.PI;
    // 每次的角度偏移量
    let xAngle=Math.PI/30;
    // 临时角度变量
    let tmpAngle=startAngle;
    setInterval(rander,1);

    function rander(){
      if (tmpAngle >= endAngle) {
        return;
      } else if (tmpAngle + xAngle > endAngle) {
        tmpAngle = endAngle;
      } else {
        tmpAngle += xAngle;
      }
      ctx.setGlobalAlpha(0.3);
      ctx.arc(width/2, 150, 100, startAngle, tmpAngle, false);
      ctx.setStrokeStyle('#ffffff');
      ctx.setLineWidth(80);
      ctx.stroke();
      ctx.draw();
    }
  }
})
