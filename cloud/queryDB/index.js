//导入包
const app = require('@tencent/tcb-admin-sdk');
// 云函数入口函数
exports.main = async (event, context) => {
  app.init({
    secretId: 'AKIDlRyMbf1JxQhrqeKk295vb6Q1XwEM57kC',
    secretKey: 'RhniS1OcflAPVUM4bBh8OSN7g4HUbmso',
    envName: 'dynamic-3a28b7',
    mpAppId: 'wxe818f104e8f19da2'
  });
  const db = app.database();
  const collect = db.collection('history');
  //返回数据库所有数据给前端，即历史记录查询功能
  var obj = await collect.where({

  }).get();
  if (!obj || !obj.data || !obj.data.length) {
    return null;
  }
  //数组转换为字符串
  var result = JSON.stringify(obj.data);
  //字符串转换为json对象
  result = JSON.parse(result);
  return result;
}