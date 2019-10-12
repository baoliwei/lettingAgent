<template>
  <el-card class="rc-partners-shop">
    <rc-form
      ref="form"
      v-model="form"
      :data="formData"
      :attr="{ inline: true }"
      confirm-button-text="修改资料"
      @confirm="modifyInfo"
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
const { getList, modifyUserInfo } = service
export default {
  mixins: [TableMixin],
  data () {
    return {
      formData: DETLAIL_FORM_DATA,
      // UPDATE user SET name=?, sex=?, age=?, IDCard=?, type=? WHERE id=?
      form: {
        id: this.$route.params.id,
        name: '',
        age: '',
        sex: '',
        type: '',
        IDCard: ''
      }
    }
  },
  created() {
    this.getInfoById()
  },
  activated () {
    this.onReload()
  },
  methods: {
    async getInfoById() {
      const params = {
        id: this.form.id
      }
      const result = await getList(params)
      this.form = result.result[0]
    },
    async modifyInfo () {
      const params = this.form
      await modifyUserInfo(params)
      this.$notify.success({
        title: '提示',
        message: '修改成功'
      })
      this.$router.push(`/user/list`)
      // table.total = total
      // table.list = result.result
    }
    // modifyInfo (res) {
    //   console.log(res)
    // }
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
