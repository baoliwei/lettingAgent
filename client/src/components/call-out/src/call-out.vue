<template>
  <div class="rc-call-out" :style="{width:width}">
    <el-input style="width:190px;" size="mini" placeholder="请输入内容" v-model="tel">
    </el-input>
    <el-button style="margin-left:5px;" :disabled="isCall" type="primary" slot="append" size="mini" icon="el-icon-phone" @click="onCall"></el-button>
  </div>
</template>
<script>
import service from '@/services'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('CCModule')
let { callNumber, postCallDailOut } = service

export default {
  name: 'rc-call-out',
  props: {
    phone: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '240px'
    },
    isCO: { // 工单
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      'ccInfo': state => state.info,
      'status': state => state.status,
    }),
    isCall () {
      return this.tel === ''
    }
  },
  data () {
    return {
      tel: this.phone
    }
  },

  methods: {
    async  onCall () {
      if (this.verifyIntNumber(this.tel)) {
        if (!this.status.isLogin) {
          this.$notify.error({ title: '提示', message: '当前坐席未登录' })
          return
        }
        if (this.status.toolBar === 1) {
          this.$notify.error({ title: '提示', message: '外呼失败,坐席忙，请稍后再发起外呼' })
          return
        }
        try {
          if (this.isCO) {
            await postCallDailOut({ complaint_order_id: this.$route.params.id, phone: this.tel })
          } else {
            await callNumber({ customerNumber: this.tel, property: this.ccInfo.property })
          }
          this.$notify.success({ title: '提示', message: '外呼成功' })
        } catch (error) {
          this.$notify.error({ title: '提示', message: '呼叫失败' })
        }
      } else {
        this.$message.error(`请输入正确手机号`)
      }
    },
    verifyIntNumber (value) {
      const reg = new RegExp(`^\\d{${11}}$`)
      return reg.test(value)
    }
  }
}
</script>

<style lang="scss" >
.rc-call-out {
  display: inline-block;
  .rc-call-out__button {
    color: #fff !important;
    background-color: #fd521d !important;
    border-color: #fd521d !important;
  }
}

</style>
