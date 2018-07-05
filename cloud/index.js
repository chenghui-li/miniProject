
var request = require('request');
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
exports.main = async (event) => {
  //与远程CVM发起连接
  let result = await rp({
    url: 'http://111.230.202.52:80',
    form: event
  });
  //返回cvm识别的结果
  return result;
}