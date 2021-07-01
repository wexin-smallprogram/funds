// 云函数入口文件
const cloud = require('wx-server-sdk')

// cloud.init()
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(wxContext)
  try {
    const result = await cloud.openapi.cloudbase.addDelayedFunctionTask({
      "env": 'fund-cloud-5g0wey7v6ae4e21e',
      "data": "{\"test\":true}",
      "functionName": 'getFunds',
      "delayTime": 10
    })
    debugger
    return result
  } catch (err) {
    debugger
    return err
  }
}