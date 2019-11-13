#  aftersale-integration-fe
> 售后服务gatewey前端
> A Java + Vue.js project for aftersale-integration-fe

# 开发环境
## 前端环境

### 项目初始化
> git clone git@gitlab.renrenche.com:aftersale/aftersale-integration-fe.git

### 安装依赖
> yarn install

### 项目启动
- 启动前端服务 yarn start

## 后端环境
> java

## Hosts及账号
- 账号/密码：tdtkzg / aaa111
- host
[host wiki地址](http://wiki.shanyishanmei.com/pages/viewpage.action?pageId=4011568 "host wiki地址")

```
127.0.0.1 refund-approval.shanyishanmei.com
10.172.155.208 mis.shanyishanmei.com
```

## 备注
具体配置请找测试或者后端开发
## 访问地址
> http://aftersale-integration.shanyishanmei.com:8001/
# 测试环境
## 沙盒部署
### 构建&部署
jenkins:
[jenkins](http://deploy.shanyishanmei.com/view/%E4%B8%9A%E5%8A%A1%E7%AB%AFnode/job/XS-Testing-BuildAndDeploy-aftersale-integration-fe/ "jenkins")
注意：测试环境构建提交的是分支名

## Hosts及账号
- 账号/密码：tdtkzg / aaa111
- host
[host wiki地址](http://wiki.shanyishanmei.com/pages/viewpage.action?pageId=4011568 "host wiki地址")

```
10.80.236.125 aftersale-integration.shanyishanmei.com
```

## 备注
host 可先配置沙盒00，具体配置请找测试或者后端开发
## 访问地址
   http://aftersale-integration.shanyishanmei.com:8001/

# 线上环境
## 线上部署
### 构建&部署
jenkins:
[线上构建](http://deploy.shanyishanmei.com/view/%E4%B8%9A%E5%8A%A1%E7%AB%AFnode/job/XS-Production-Build-aftersale-integration-fe/ "线上构建")

[线上部署](http://deploy.shanyishanmei.com/view/%E4%B8%9A%E5%8A%A1%E7%AB%AFnode/job/XS-Production-Deploy-aftersale-integration-fe/ "线上部署")


## Hosts及账号
- 账号/密码：tdtkzg / aaa111
- host
[host wiki地址](http://wiki.shanyishanmei.com/pages/viewpage.action?pageId=4011568 "host wiki地址")

## 访问地址
   http://aftersale-integration.shanyishanmei.com/

#项目结构说明


## 如果你安装很慢的话

```shell
# npm 安装
SASS_BINARY_SITE=http://npm.taobao.org/mirrors/node-sass npm install node-sass -D

# yarn 指向淘宝镜像
yarn config set registry https://registry.npm.taobao.org -g

# yarn node-sass 安装
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
```

# Components
> @see [element docs](http://element.eleme.io/#/zh-CN/component/installation)
> 这里需要注意的是 并未全局引入饿了么组件 如果发现某个组件不能使用 就在 components 下手动引入

# Rules

## [eslint]

```js
/* eslint-disable */
alert('foo');// eslint-disable-line 当前行上禁用所有规则：
/* eslint-enable */
```


## [stylelint](https://github.com/stylelint/stylelint)

> tool [vscode tool](https://github.com/shinnn/vscode-stylelint)

> @see [rules config](https://stylelint.io/user-guide/rules/)

> @see [example config](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/example-config.md)

> @see [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)

> @see [中文翻译](https://segmentfault.com/a/1190000004588228)

> @see [stylelint-scss](https://github.com/kristerkari/stylelint-scss)

## stylelint 规则禁用

```css

# 在css文件中，你可以暂时关闭某条规则，也可以关闭所有规则
/* stylelint-disable */
a {}
/* stylelint-enable */

# 关闭个别规则
/* stylelint-disable selector-no-id, declaration-no-important   */
#id {
    color: pink !important;
}
/* stylelint-enable */

# 当然你也可以通过/* stylelint-disable-next-line */来关闭那些你不需要明确重新启用的下一行规则
#id {
  /* stylelint-disable-next-line declaration-no-important */
  color: pink !important;
}

# 禁用一行规则
/* stylelint-disable-line */

# 有些复杂的，重叠的禁用和启用模式同样支持
/* stylelint-disable */
/* stylelint-enable foo */
/* stylelint-disable foo */
/* stylelint-enable */
/* stylelint-disable foo, bar */
/* stylelint-disable baz */
/* stylelint-enable baz, bar */
/* stylelint-enable foo */

```
