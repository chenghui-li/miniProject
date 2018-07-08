
var request = require('request');
const app = require('@tencent/tcb-admin-sdk');

//同步运行

var rp = (opts) => new Promise((resolve, reject) => {
  request.post(opts, (err, response, body) => {
    if (!err) {
      resolve(response);
    } else {
      reject(err);
    }
  });
});

// 云函数入口函数
exports.main = async (event, context, callback) => {
  //与远程CVM发起连接
  //return event;
  var result = await rp({
    url: 'http://111.230.180.172:80',
    form: event
  });

  setTimeout(() => {
    callback(null, 123);
  }, 3500);

  
  // app.init({
  //   secretId: 'AKIDlRyMbf1JxQhrqeKk295vb6Q1XwEM57kC',
  //   secretKey: 'RhniS1OcflAPVUM4bBh8OSN7g4HUbmso',
  //   envName: 'dynamic-3a28b7',
  //   mpAppId: 'wxe818f104e8f19da2'
  // });
  
  // result = result.body;
  // result = result.substring(0, result.length - 1);

  // console.log(result);
  // const db = app.database();
  // const collect = db.collection('Birds');
  // var obj = await collect.where({
  //   Ename: result
  //   }).get();

  // //var re = 'aaabb\n';
  // //return re.substring(0,re.length-1);

  // if (!obj || !obj.data || !obj.data.length) {
  //   return null;
  // }
  
  // let data = obj.data;
  // let bird = data[0];
  // delete bird['_id'];
  // bird.time = event.time;
  // //console.log(bird);
  // let addResult = await db.collection('history').add(bird);

  // //console.log(addResult);
  // // obj.data.forEach((item, index) => {
  // //   console.log(typeof index, index);
  // //   console.log(typeof item);
  // //   console.log(item);
  // // });
  
  // //返回cvm识别的结果
  // return bird;
}