<template>
  <el-card class="rc-partners-shop">
    <rc-form
      ref="form"
      v-model="form"
      :data="formData"
      :attr="{ inline: true }"
      confirm-button-text="查询"
      @confirm="onSearch('table')" >
      <!-- <template slot="footer">
        <div class="rc-partners-shop__operations">
          <el-button @click="publishHouse">发布房源</el-button>
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
const { findAllLeaseHouse, deleteHouseInfo } = service
export default {
  mixins: [TableMixin],
  data () {
    return {
      formData: FORM_DATA,
      COLUMNS: COLUMNS.call(this),
      // id, name, style, isSun, type, isNew, propertyRight
      form: {
        name: '',
        style: '',
        isSun: '',
        type: '',
        isNew: '',
        propertyRight: ''
      }
    }
  },
  activated () {
    this.onReload()
  },
  methods: {
    async load (table) {
      const params = this.form
      const result = await findAllLeaseHouse(params)
      console.log(result)
      // table.total = total
      table.list = result.result
    },
    publishHouse () { // 跳转至发布房源
      this.$router.push(`/house/detail/add/0`)
    },
    modifyInfo (res) {
      this.$router.push(`/house/detail/edit/${res.id}`)
    },
    async deleteInfo (res) {
      const params = {
        id: res.id
      }
      await deleteHouseInfo(params)
      this.$notify.success({
        title: '提示',
        message: '删除成功'
      })
      this.onSearch('table')
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
