<template>
  <el-card class="login">
    <div slot="header" class="clearfix">
      <span>{{isForLogin ? '请登录' : '请注册'}}</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
    </div>
    <el-form>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username"  placeholder="请填写用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="form.password"  placeholder="请填写密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="login">登录</el-button>
        <el-button @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
// import { mapState, mapGetters, mapMutations } from 'vuex'
import { mapState, mapMutations, mapActions } from 'vuex'
import service from '@/services'
const { login, register } = service
export default {
  name: 'bk-login',
  data () {
    return {
      isForLogin: true, // 是否是登录页
      form: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  },
  created () {
    this.init()
  },
  methods: {
    ...mapMutations([
      'setUserInfo',
      'setIsLogin'
    ]),
    ...mapActions([
      'getUserInfo'
    ]),
    async init () {
      await this.getUserInfo()
      this.isLogin && this.router.push('/')
    },
    async login () {
      if (this.isForLogin) {
        let params = this.form
        let result = await login(params)
        this.setUserInfo(result.result)
        this.setIsLogin(true)
        console.log('aa', this.isLogin)
        this.$router.push('/')
      }
      this.isForLogin = true

    },
    async register () {
      if (!this.isForLogin) {
        let params = this.form
        let result = await register(params)
        console.log(result)
        this.isForLogin = true
      }
      this.isForLogin = false
    }
  }
}
</script>
<style lang="scss">
.login {
  width: 50%;
  margin: 0 auto;
  margin-top: 300px;
}
</style>
