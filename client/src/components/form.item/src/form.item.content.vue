<template>
  <div class="rc-form-item__content">
      <div class="rc-form-item__content_c">
        <slot></slot>
      </div>
      <p class="rc-form-item__content-tip"></p>
  </div>
</template>
<script>
export default {
  name: 'rc-form-item-content',
  props: {
    tip: {
      type: String
    }
  }
}
</script>
<style lang="scss">
.rc-form-item {
  &__content {
    display: flex;
    align-items: center;

    &-tip {
      padding-left: 20px;
      width: auto;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
