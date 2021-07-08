// 云函数入口文件
const cloud = require('wx-server-sdk')
const http = require('http');
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let params = ''
  for (let key in event) {
    params += `${key}=${event[key]}&`
  }
  // http://fund.eastmoney.com/Data/Fund_JJJZ_Data.aspx?t=1&lx=3&letter=&gsid=&text=&sort=zdf,desc&page=1,200&dt=1625469070561&atfc=&onlySale=0
  // http://fund.eastmoney.com/Data/Fund_JJJZ_Data.aspx?t=1&lx=2&letter=&gsid=&text=&sort=zdf,desc&page=2,200&dt=1625469462869&atfc=&onlySale=0
  const url = 'http://fund.eastmoney.com/Data/Fund_JJJZ_Data.aspx?' + params
  console.log(url)
  let resultData = ''
  return new Promise(function (resolve, reject) {
    http.get(url, function (request) {
      //设置编码格式
      request.setEncoding('utf8');
      request.on('data', function (result) {
        //由于数据不是全部接收完毕，该方法会调用很多次，需要把数据拼接到resultData中去；
        console.log(result)
        eval(result)
        resultData = db;
      })
      //数据全部接收完毕以后执行的操作
      request.on('end', function () {
        //把所有的数据包括到 回调函数中，返回到前端
        resolve({
          fundsData: JSON.stringify(resultData),
          event,
          openid: wxContext.OPENID,
          appid: wxContext.APPID,
          unionid: wxContext.UNIONID,
          functionName: 'getFunds'
        })
      })
    }).on('error', function (e) {
      //当请求失败时把错误信息返回给请求者
      console.log(e.message)
      reject(new Error(e.message))
    })
  })
}