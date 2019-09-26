<template>
  <header class="rc-header">
    <div class="logo" >
      <!-- <img src="~assets/img/logo.png"> -->
      <h1> 房产中介管理信息系统</h1>
    </div>
    <div class="tool">
      <div class="user">
        <el-dropdown class="user-info">
          <div class="info-container">
            <i class="rc-icon-account"></i>
            <span class="username">&nbsp;&nbsp;{{ userInfo.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout"><i class="rc-icon-exit"></i> &nbsp;&nbsp;退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>
<script>
import { mapState } from 'vuex'
import { globalConfig } from '@/config/global.config'

export default {
  name: 'rc-header',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
  },
  created () {
  },
  methods: {
    logout () {
      window.location.href = globalConfig.logoutUrl
    },
    onReload () {
      window.location.reload()
    }
  }
}
</script>
<style src="./header.scss" lang="scss"></style>
