<template>
  <div class="rc-content">
    <slot name="tabs"></slot>
    <div class="rc-content-body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'rc-content'
}
</script>
<style lang="scss">
@import 'scss/variables';
@import 'scss/mixins/mixin';

.rc-content {
  width: auto;
  position: absolute;
  top: 0;
  left: $side-bar-width;
  bottom: 0;
  right: 0;
  overflow: hidden;

  &__collapse {
    left: 49px - 10px;
  }

  &-body {
    position: absolute;
    width: auto;
    top: 56px;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
    overflow: auto;
    transition: all 0.2s ease;
    display: block;
    will-change: scroll-position;
    backface-visibility: hidden;
    -webkit-overflow-scrolling: touch;
    padding: 20px;
    padding-top: 0;
  }

  &[no-padding] {
    .rc-content-body {
      padding: 0;
    }
  }
}
</style>
