let util = require('../../utils/util.js');
Page({
  data: {
    consumpPatternsList: [],
    billNo: '',
    date: '',
    selectName: '餐饮',
    selectIcon: '../../images/餐饮.png',
    isShowCalculator: false,
    spendMoney: '0.00',
    remarksText: '',
    calculatorEnd: true,
    todayDate: ''
  },
  //选择支出类目
  onConsumpItemClick: function (e) {
    let index = e.currentTarget.dataset.index;
    let list = this.data.consumpPatternsList;

    for (let key of list) {
      key.IsSelect = false;
    }
    list[index].IsSelect = true;
    this.setData({
      consumpPatternsList: list,
      selectName: list[index].Name,
      selectIcon: list[index].IconSel
    })
  },

  //选择时间
  onDateChange: function (e) {
    this.setData({
      date: e.detail.value
    });
  },

  //显示计算器
  showCalculator: function () {
    this.setData({
      isShowCalculator: true
    })
  },
  hiddenCalculator: function () {
    this.setData({
      isShowCalculator: false
    })
  },

  //备注
  onInputRemarks: function (e) {
    let text = e.detail.value;
    this.setData({
      remarksText: text
    });
    if (this.data.isShowCalculator) {
      this.hiddenCalculator();
    }
  },
  getSpendWayList: function () {
    let res = {
      "Code": 1, "Message": "操作成功", "SpendWayList": [{ "ID": 1, "Name": "餐饮", "Icon": "../../images/餐饮.png", "IsSelect": true, "IconSel": "../../images/餐饮.png" }, { "ID": 2, "Name": "购物", "Icon": "../../images/购物.png", "IsSelect": false, "IconSel": "../../images/购物.png" }, { "ID": 3, "Name": "日用", "Icon": "../../images/日用.png", "IsSelect": false, "IconSel": "../../images/日用.png" }, { "ID": 4, "Name": "交通", "Icon": "../../images/交通.png", "IsSelect": false, "IconSel": "../../images/交通.png" }, { "ID": 5, "Name": "蔬菜", "Icon": "../../images/蔬菜.png", "IsSelect": false, "IconSel": "../../images/蔬菜.png" }, { "ID": 6, "Name": "水果", "Icon": "../../images/水果.png", "IsSelect": false, "IconSel": "../../images/水果.png" }, { "ID": 7, "Name": "零食", "Icon": "../../images/零食.png", "IsSelect": false, "IconSel": "../../images/零食.png" }, { "ID": 8, "Name": "运动", "Icon": "../../images/运动.png", "IsSelect": false, "IconSel": "../../images/运动.png" }, { "ID": 9, "Name": "娱乐", "Icon": "../../images/娱乐.png", "IsSelect": false, "IconSel": "../../images/娱乐.png" }, { "ID": 10, "Name": "通讯", "Icon": "../../images/通讯.png", "IsSelect": false, "IconSel": "../../images/通讯.png" }, { "ID": 11, "Name": "服饰", "Icon": "../../images/服饰.png", "IsSelect": false, "IconSel": "../../images/服饰.png" }, { "ID": 12, "Name": "美容", "Icon": "../../images/美容.png", "IsSelect": false, "IconSel": "../../images/美容.png" }, { "ID": 13, "Name": "房子", "Icon": "../../images/房子.png", "IsSelect": false, "IconSel": "../../images/房子.png" }, { "ID": 14, "Name": "居家", "Icon": "../../images/居家.png", "IsSelect": false, "IconSel": "../../images/居家.png" }, { "ID": 15, "Name": "小孩", "Icon": "../../images/小孩.png", "IsSelect": false, "IconSel": "../../images/小孩.png" }, { "ID": 16, "Name": "长辈", "Icon": "../../images/长辈.png", "IsSelect": false, "IconSel": "../../images/长辈.png" },
      { "ID": 17, "Name": "社交", "Icon": "../../images/社交.png", "IsSelect": false, "IconSel": "../../images/社交.png" }, { "ID": 18, "Name": "旅行", "Icon": "../../images/旅行.png", "IsSelect": false, "IconSel": "../../images/旅行.png" }, { "ID": 19, "Name": "烟酒", "Icon": "../../images/烟酒.png", "IsSelect": false, "IconSel": "../../images/烟酒.png" }, { "ID": 20, "Name": "数码", "Icon": "../../images/数码.png", "IsSelect": false, "IconSel": "../../images/数码.png" }, { "ID": 21, "Name": "汽车", "Icon": "../../images/汽车.png", "IsSelect": false, "IconSel": "../../images/汽车.png" }, { "ID": 22, "Name": "医疗", "Icon": "../../images/医疗.png", "IsSelect": false, "IconSel": "../../images/医疗.png" }, { "ID": 23, "Name": "书籍", "Icon": "../../images/书籍.png", "IsSelect": false, "IconSel": "../../images/书籍.png" }, { "ID": 24, "Name": "学习", "Icon": "../../images/学习.png", "IsSelect": false, "IconSel": "../../images/学习.png" }, { "ID": 25, "Name": "宠物", "Icon": "../../images/宠物.png", "IsSelect": false, "IconSel": "../../images/宠物.png" }, { "ID": 26, "Name": "礼金", "Icon": "../../images/礼金.png", "IsSelect": false, "IconSel": "../../images/礼金.png" }, { "ID": 27, "Name": "礼物", "Icon": "../../images/礼物.png", "IsSelect": false, "IconSel": "../../images/礼物.png" }, { "ID": 28, "Name": "办公", "Icon": "../../images/办公.png", "IsSelect": false, "IconSel": "../../images/办公.png" }]
    };
    this.setData({
      consumpPatternsList: res.SpendWayList
    })
  },

  confirmData: function () {
    if (this.data.calculatorEnd) {
      this.calculatorResult();
    }
    if (parseFloat(this.data.spendMoney) == 0) {
      wx.showToast({
        title: '请输入金额',
        duration: 2000
      });
      return;
    }

    this.addRecordBill();
  },

  //保存账单到服务
  addRecordBill: function () {

  },

  calculatorResult: function () {
    if (parseFloat(this.data.spendMoney) != 0) {
      let result = this.data.spendMoney + '';
      let strResult = result.split('+');
      let sum = 0;
      strResult.forEach(num => {
        sum += parseFloat(num == "" ? 0 : num);
      });
      this.setData({
        spendMonney: sum == 0 ? '0.00' : sum,
        calculatorEnd: true
      });
      this.hiddenCalculator();
    }
  },

  onReady: function () {
    this.setData({
      date: util.formatTime(new Date(), 'yyyy-MM-dd'),
      todayDate: util.formatTime(new Date(), 'yyyy-MM-dd')
    });
    this.getSpendWayList();
  }
})