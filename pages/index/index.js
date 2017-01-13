//index.js
//获取应用实例
var app = getApp()
//get file component
const AV = require('../../utils/av-weapp.js')
var Util = require( '../../utils/util.js' );
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    image1Path: '',
    image2Path: '',
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
        image1Path: userInfo.avatarUrl,
        image2Path: userInfo.avatarUrl,
      })
    })
  },
  chooseimage1: function () {
    var _this = this;  
    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {  
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        console.log(res);
        _this.setData({  
          image1Path: res.tempFilePaths  
        })  
       var image1Path = res.tempFilePaths[0];  

      }  
    })
  },
  chooseimage2: function () {
    var _this = this;  
    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {  
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        console.log(res);
        _this.setData({  
          image2Path: res.tempFilePaths  
        })  
       var image2Path = res.tempFilePaths[0];  

      }  
    })
  },
  rate: function() {
    this.setData({
        score: 80
      });
    var result = this.data.image1Path;
    var image1 = new Image();
    image1.src = result;

    // todo change 
    wx.request( {  
      url: "http://apis.baidu.com/idl_baidu/faceverifyservice/face_compare",
      header: {  
        "Content-Type": "application/x-www-form-urlencoded",
        'apikey':'',  
      },  
      method: "POST",  
     //data: { cityname: "上海", key: "1430ec127e097e1113259c5e1be1ba70" },  
      data: ( {
  "params": [
    {
      "cmdid": "1000",
      "appid": "10000",
      "clientip": "10.23.34.5",
      "type": "st_groupverify",
      "groupid": "0123456",
      "versionnum": "1.0.0.1",
      "usernames": {
        "name2": "name2",
        "name1": "name1"
      },
      "images": {
        "name2": "/9j/4AAQSk...UKn0D//2Q==",
        "name1": "/9j/4AXc5f...8KKKroB//9k="
      },
      "cates": {
        "name2": "2",
        "name1": "1"
      }
    }
  ],
  "jsonrpc": "2.0",
  "method": "Compare",
  "id": 12345
}),  
      complete: function( res ) {  
        console.log(res);
      }  
    });
  },


})
