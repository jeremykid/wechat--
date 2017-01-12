//index.js
//获取应用实例
var app = getApp()
//get file component
const AV = require('../../utils/av-weapp.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    tempFilePaths: '',
    title: '颜值打分神器',
    score: 90.99,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo:userInfo,
        tempFilePaths: userInfo.avatarUrl
      })
    })
  },
  chooseimage: function () {
    var _this = this;  
    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {  
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        console.log(res);
        _this.setData({  
          tempFilePaths: res.tempFilePaths  
        })  
       var tempFilePath = res.tempFilePaths[0];  
       new AV.File('image', {  
          blob: {  
            uri: tempFilePath,  
          },  
        }).save().then(  
          file => console.log(file.url())  
          ).catch(console.error); 
      }  
    })
  },
  rate: function() {
    this.setData({
        score: 80

      })
  }
})
