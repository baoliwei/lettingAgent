<template>
  <div class="rc-container-results">
      <div class="content">
          <div class="info">
            <i v-if="this.status == 'success'" class="el-icon-success"></i>
            <i v-if="this.status == 'error'" class="el-icon-error"  id="icon-error"></i>
            <h2>{{info}}</h2>
            <div class="message">提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。</div>
            <div class="info-area" v-if="this.status == 'error'">
              <div class="item-name">您提交的内容有如下错误：</div>
              <div class="errorInfo">
                <i class="el-icon-error"></i>&nbsp;您的账户已被冻结
                <a href="#">立即冻结&gt;</a>
              </div>
              <div class="errorInfo">
                <i class="el-icon-error"></i>&nbsp;您的账户还不具备申请资格
                <a href="#">立即升级&gt;</a>
              </div>
            </div>
            <div class="operation">
                <a href="#" v-if="this.status == 'success'"><el-button type="primary">返回列表</el-button></a>
                <a href="#" v-if="this.status == 'error'"><el-button type="primary">返回修改</el-button></a>
                <a href="#" v-if="this.status == 'success'"><el-button>查看项目</el-button></a>
            </div>
          </div>
      </div>
      <el-footer class="footer">
        Copyright&copy;2017 人人车技术部出品
      </el-footer>
  </div>
</template>
<script>
export default {
  name: 'rrc-results',
  props: {
    status: {
      type: String
    }
  },
  computed: {
    info () {
      switch (this.status) {
        case 'success':
          return '提交成功'
        case 'error':
          return '提交失败'
        default:
          return '未匹配到status'
      }
    }
  }
}
</script>
<style lang="scss">
@import "scss/variables";

.rc-container-results {
  background-color: $bg-color;
  height: 100%;

  .content {
    min-height: calc(100% - 60px);
    display: flex;
    align-items: center;
    justify-content: center;

    .info {
      text-align: center;
      width: 72%;
      margin-top: 20px;

      .el-icon-success {
        font-size: 72px;
        color: #52c41a;
        margin-bottom: 24px;
      }

      .el-icon-error {
        color: $primary;
      }

      #icon-error {
        font-size: 72px;
        color: #f5222d;
        margin-bottom: 24px;
      }

      h2 {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        line-height: 32px;
        margin-bottom: 16px;
      }

      .message {
        color: #9c9c9c;
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 24px;
      }

      .info-area {
        background-color: #f1f1f1;
        padding: 24px 40px;
        border-radius: 2px;
        text-align: left;

        .item-name {
          font-size: 16px;
          color: $font-color;
          margin-bottom: 20px;
        }

        .errorInfo {
          color: #737373;
          font-size: 14px;
          margin-bottom: 10px;
        }

        a {
          text-decoration: none;
          color: #1890ff;
        }

        a:hover {
          color: #58abf7;
        }
      }
    }

    .operation {
      text-align: center;
      margin: 20px auto;

      .el-button {
        margin: 0 10px;
      }
    }
  }

  .footer {
    color: #c3c3c3;
    font-size: 14px;
    text-align: center;
  }
}
</style>
