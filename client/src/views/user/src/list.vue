<template>
  <el-card class="rc-partners-shop">
    <rc-form
      ref="form"
      v-model="form"
      :data="formData"
      :attr="{ inline: true }"
      confirm-button-text="查询"
      @confirm="onSearch" >
      <!-- <template slot="footer">
        <div class="rc-partners-shop__operations">
          <el-button @click="onReset">重置</el-button>
          <rc-rule ruleCode="p_shop_create">
            <el-button plain type="primary" @click="toAddShop">添加门店</el-button>
          </rc-rule>
        </div>
      </template> -->
    </rc-form>
    <rc-table
      ref="table"
      bg-header
      :attr="{ size: 'small', border: true }"
      :columns="COLUMNS"
      :isReload="false"
      @load="load"
    ></rc-table>
  </el-card>
</template>
<script>
import { FORM_DATA, COLUMNS } from './constant'
import TableMixin from '@/mixins/table.mixin'
import service from '@/services'
const { getList } = service
export default {
  mixins: [TableMixin],
  data () {
    return {
      formData: FORM_DATA,
      COLUMNS: COLUMNS.call(this),
      form: {
        name: '',
        username: '',
        age: '',
        sex: '',
        type: '',
        IDCard: ''
      }
    }
  },
  activated () {
    this.onReload()
  },
  methods: {
    async load (table) {
      const params = this.form
      const result = await getList(params)
      console.log(result)
      // table.total = total
      table.list = result.result
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
