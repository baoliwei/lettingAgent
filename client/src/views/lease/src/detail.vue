<template>
  <el-card class="rc-partners-shop">
    <rc-form
      ref="form"
      v-model="form"
      :data="formData"
      :attr="{ inline: true }"
      confirm-button-text="提交"
      @confirm="updateHouse"
    >
      <!-- <template slot="footer">
        <div class="rc-partners-shop__operations">
          <el-button @click="onReset('form')">重置</el-button>
        </div>
      </template> -->
    </rc-form>

  </el-card>
</template>
<script>
import { DETLAIL_FORM_DATA } from './constant'
import TableMixin from '@/mixins/table.mixin'
import service from '@/services'
const { findAllLeaseHouse, modifyLeaseHouseInfo } = service
export default {
  mixins: [TableMixin],
  data () {
    return {
      formData: DETLAIL_FORM_DATA,
      form: {
        id: this.$route.params.id,
        startTime: '',
        endTime: '',
        money: '',
        remark: ''
      }
    }
  },
  created() {
    this.init()
  },
  activated () {
    this.onReload()
  },
  methods: {
    init() {
      this.$route.params.type === 'edit' && this.getInfoById()
    },
    async getInfoById() {
      const params = {
        id: this.form.id
      }
      const result = await findAllLeaseHouse(params)
      this.form = Object.assign(this.form, result.result[0])
    },
    updateHouse() {
      this.$route.params.type === 'edit' && this.modifyInfo()
    },
    async modifyInfo () {
      const params = this.form
      await modifyLeaseHouseInfo(params)
      this.$notify.success({
        title: '提示',
        message: '修改成功'
      })
      this.$router.push(`/lease/list`)
    }
  }
}
</script>
<style lang="scss">
  @include b(partners-shop) {
    @include e(operations) {
      display: inline-block;
      margin-left: 20px;
    }
  }
</style>
