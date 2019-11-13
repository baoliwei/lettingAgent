const validator = {
  pattern: {
    // 判断密码 6-20的数字与字母的组合
    enAndZn: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
    // 判断是汉字
    isChinese: /^[\u4E00-\u9FA5]{0,10}$/,
    // 判断是不是手机
    isPhone: /^1(3|4|5|7|8)\d{9}$/,
    // 判断身份证
    enIdentityCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  }
}
export default validator
