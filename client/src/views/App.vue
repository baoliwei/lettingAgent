<template>
  <main class="rc-main">
    <rc-header @onCollapse="onCollapse"></rc-header>
    <bk-login v-if="!isLogin"></bk-login>
    <rc-body v-else ref="body"></rc-body>
  </main>
</template>
<script>
import { mapState } from 'vuex'
import bkLogin from '@/views/login/index.vue'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  },
  components: {
    BkLogin: bkLogin
  },
  methods: {
    onCollapse (val) {
      this.$refs.body.onCollapse(val)
    }
  }
}
</script>
<style lang="scss">
%content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

html,
body {
  @extend %content;

  #app {
    @extend %content;
  }
}

.rc-main {
  @extend %content;
}
</style>
