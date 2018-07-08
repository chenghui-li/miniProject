
var request = require('request');
const app = require('@tencent/tcb-admin-sdk');
// 云函数入口函数
exports.main = async (event, context, callback) => {
  //数据库初始化
   app.init({
     secretId: 'AKIDlRyMbf1JxQhrqeKk295vb6Q1XwEM57kC',
     secretKey: 'RhniS1OcflAPVUM4bBh8OSN7g4HUbmso',
     envName: 'dynamic-3a28b7',
     mpAppId: 'wxe818f104e8f19da2'
   });
   var result = event.key;
   const db = app.database();
   const collect = db.collection('Birds');
   var obj = await collect.where({
     Ename: result
     }).get();
     //容错处理
   if (!obj || !obj.data || !obj.data.length) {
     return null;
   }
   let data = obj.data;
   let bird = data[0];
   delete bird['_id'];
   bird.time = event.time;
   //插入history数据库
   let addResult = await db.collection('history').add(bird);
  // //返回cvm识别的结果
   return bird;
}