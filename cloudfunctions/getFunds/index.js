// 云函数入口文件
const cloud = require('wx-server-sdk')
const http = require('http');
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // return {
  // event,
  // openid: wxContext.OPENID,
  // appid: wxContext.APPID,
  // unionid: wxContext.UNIONID,
  // name: 'fyz'
  // }
  let params = ''
  for (let key in event) {
    params += `${key}=${event[key]}&`
  }
  const url = 'http://vip.stock.finance.sina.com.cn/fund_center/data/jsonp.php/IO.XSRV2.CallbackList[`6XxbX6h4CED0ATvW`]/NetValue_Service.getNetValueOpen?' + params
  console.log(url)
  let resultData = ''
  function asyncFundData () {
    return new Promise(function (resolve, reject) {
      http.get(url, function (request) {
        //设置编码格式
        request.setEncoding('utf8');
        request.on('data', function (result) {
          //由于数据不是全部接收完毕，该方法会调用很多次，需要把数据拼接到resultData中去；
          // console.log(result)
          resultData += result;
        })
        //数据全部接收完毕以后执行的操作
        request.on('end', function () {
          //把所有的数据包括到 回调函数中，返回到前端
          const str = JSON.stringify(resultData)
          console.log(str)
          resolve(str)
        })
      }).on('error', function (e) {
        //当请求失败时把错误信息返回给请求者
        // res.end(e.message);
        console.log(e.message)
      })
    })
  }
  const fundsData = await asyncFundData()
  return {
    fundsData,
    event
  }

}

