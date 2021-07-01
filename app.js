// app.js
App({
  onLaunch () {
    wx.cloud.init({
      traceUser: true,
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
      }
    })

    wx.cloud.callFunction({
      // 云函数名称
      name: 'getFunds',
      // 传给云函数的参数
      data: {
        a: 1,
        b: 2,
      },
    })
      .then(res => {
        console.log(res.result)
      })
      .catch(console.error)

  },
  globalData: {
    userInfo: null
  }
})
