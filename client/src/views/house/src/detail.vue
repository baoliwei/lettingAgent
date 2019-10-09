<template>
  <el-card class="rc-partners-shop">
    <rc-form
      ref="form"
      v-model="form"
      :data="formData"
      :attr="{ inline: true }"
      confirm-button-text="提交"
      @confirm="pubilshHouse"
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
const { pubilshHouse } = service
export default {
  mixins: [TableMixin],
  data () {
    return {
      formData: DETLAIL_FORM_DATA,
      // UPDATE user SET name=?, sex=?, age=?, IDCard=?, type=? WHERE id=?
      form: {
        id: this.$route.params.id,
        name: '',
        addr: '',
        style: '',
        area: '',
        propertyRight: '',
        propertyOwer: '',
        type: '',
        isSun: '',
        ContactInformation: '',
        isNew: '',
        isLease: '',
        isSale: '',
        score: ''
      }
    }
  },
  activated () {
    this.onReload()
  },
  methods: {
    async pubilshHouse () {
      const params = this.form
      const result = await pubilshHouse(params)
      console.log(result)
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
