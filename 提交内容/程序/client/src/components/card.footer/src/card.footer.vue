<template>
  <div class="rc-card-footer">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'rc-card-footer'
}
</script>
<style lang="scss">
.rc-card-footer {
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100%;
  background-color: transparent;
  padding-top: 10px;

  .el-button {
    width: 130px;
  }
}

// dialog 和 card 通用 所以 此处 对 在card 中单独处理
.el-card {
  .rc-card-footer {
    margin-top: 20px;
  }
}

// dialog 微调
.el-dialog {
  &__footer {
    .rc-card-footer {
      height: 65px;

      .el-button + .el-button {
        margin-left: 20px;
      }
    }
  }
}
</style>
