// index.js
// 获取应用实例
const app = getApp()
wx.cloud.init({
  traceUser: true,
})
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    fundTypeList: [
      {
        title: '全部',
        name: 1,
        fundsData: []
      }, {
        title: '股票型',
        name: 2,
        fundsData: []
      }, {
        title: '混合型',
        name: 3,
        fundsData: []
      }, {
        title: '指数型',
        name: 5,
        fundsData: []
      }, {
        title: 'QDII',
        name: 6,
        fundsData: []
      }, {
        title: 'ETF',
        name: 11,
        fundsData: []
      }, {
        title: '债券型',
        name: 13
      }
    ],
    active: 2,
    fundsData: []
  },
  // 事件处理函数
  bindViewTap () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad () {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    this.getFundList()
  },
  getUserProfile (e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo (e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getFundList (obj = {}) {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getFunds',
      // 传给云函数的参数
      data: {
        t: 1,
        lx: obj.lx || 1,
        letter: '',
        gsid: '',
        text: '',
        sort: 'zdf,desc',
        page: '1,20',
        dt: new Date().getTime(),
        atfc: '',
        onlySale: 0
      },
      // type2: 0全部  2：股票型  1：混合型
    })
      .then(res => {
        console.group(res.result)
        if (!res.result.fundsData) return
        let fundsData = JSON.parse(res.result.fundsData)
        console.group(fundsData)
        console.group(fundsData.datas[0])
        this.setData({ fundsData: fundsData.datas })
      })
      .catch((err) => {
        console.log(err)
        this.setData({ fundsData: [] })
      })

  },
  tabsChange (event) {
    console.log(event)
    this.getFundList({ lx: event.detail.name })
  }
})
