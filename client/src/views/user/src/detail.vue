<template>
  <div class="rc-partners-ka-detail">
    <el-card>
      <!-- 商机基本信息 -->
      <base-info :info="detail" fromType="ka"></base-info>
      <!-- 合伙人基本信息 -->
      <partner-base-info :info="detail" :partnerInfo="partner_detail"></partner-base-info>
      <!-- 合作店面基本信息 && 合作店面扩展信息 -->

      <rc-card v-if="type === 'view' && String(form.audit_status) === '10'">
        <div slot="title" class="rc-detail__title"></div>
        <div style="color:red;" class="shop-title">该门店信息有修改，此处展示的为修改前的数据，待审核过后更新门店信息列表</div>
      </rc-card>

      <rc-card v-if="type === 'audit'">
        <div style="color:red;" slot="title" class="rc-detail__title">本次修改内容</div>
        <div class="shop-title">{{ changeText }}</div>
      </rc-card>

      <el-form
        ref="shopForm"
        :model="form"
        :rules="rules"
        label-width="140px"
        size="small"
        :disabled="disabledForm"
      >
        <rc-card>
          <div slot="title" class="rc-detail__title">合作店面基本信息</div>
          <div class="shop-title">店面信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="名称" prop="shop_name">
                <el-input v-model="form.shop_name" placeholder="合作店面名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="车位数" prop="parking_num">
                <el-input v-model="form.parking_num" placeholder="合作店面车位总数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="门店类型" prop="shop_type">
                <rc-select v-model="form.shop_type" :data="shopType"></rc-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="shop-title">营业时间段</div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="每天上午" prop="business_time_begin">
                <el-time-picker
                  v-model="form.business_time_begin"
                  :editable="false"
                  :clearable="false"
                  value-format="HH:mm"
                  format="HH:mm"
                >
                </el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="每天下午" prop="business_time_end">
                <el-time-picker
                  v-model="form.business_time_end"
                  :editable="false"
                  :clearable="false"
                  value-format="HH:mm"
                  format="HH:mm"
                >
                </el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="shop-title">店面联系人</div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="负责人" prop="contact_name">
                <el-input v-model="form.contact_name" placeholder="合作店面负责人姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系方式" prop="contact_phone">
                <el-input v-model="form.contact_phone" placeholder="合作店面负责人联系方式"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="shop-title">店面地址</div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="城市">{{ city }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="区域" prop="district_id">
                <rc-select v-model="form.district_id" :data="districtList"></rc-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="详细地址" prop="shop_address">
                <el-input type="textarea" v-model="form.shop_address" placeholder="合作店面详细地址，例河北省石家庄市正定县迎宾路88号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="经纬度-经度" prop="address_longitude">
                <el-input v-model="form.address_longitude" placeholder="详细地址的经纬度-经度，例116.403119"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="经纬度-纬度" prop="address_latitude">
                <el-input v-model="form.address_latitude" placeholder="详细地址的经纬度-纬度，例39.915156"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span class="notify">经纬度查询工具，<a :href="addressUrl" target="_blank">{{ addressUrl }}</a></span>
            </el-col>
          </el-row>
        </rc-card>
        <rc-card>
          <div slot="title" class="rc-detail__title">合作店面扩展信息</div>
          <div class="shop-title">店铺描述</div>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="description">
                <el-input type="textarea" v-model="form.description" placeholder="请填写店铺备注或请假、临时闭店等信息，100字内"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="shop-title">附件（支持jpg、jpeg、png，20M内）</div>
          <rc-upload-ali
            type="license"
            :images.sync="license_imgs_list"
            :limit="1"
            :isEdit="!disabledForm"
          >
            <template slot="title">营业执照</template>
          </rc-upload-ali>
          <rc-upload-ali
            type="signboard"
            :images.sync="signboard_imgs_list"
            :limit="1"
            :isEdit="!disabledForm"
          >
            <template slot="title">店面招牌图</template>
          </rc-upload-ali>
        </rc-card>
      </el-form>
      <!-- 操作记录 -->
      <rc-card v-if="['edit', 'view', 'audit'].includes(type)">
        <div slot="title" class="rc-detail__title">操作记录</div>
        <rc-table
          ref="table"
          bg-header
          :attr="{ border: true }"
          :columns="logColumns"
          :page="{ enable: false }"
          :isReload="false"
          @load="load">
        </rc-table>
      </rc-card>
      <!-- 底部按钮 -->
      <div class="footer-buttons" v-if="type === 'add'">
        <el-col>
          <p style="line-height: 24px;">提示：创建门店后，默认门店状态=“已禁用”，需手动启用后才可正常使用</p>
        </el-col>
        <el-button type="primary" size="small" @click="onSubmit">确定</el-button>
      </div>
      <div class="footer-buttons" v-else-if="type === 'edit'">
        <el-button size="small" @click="onCancel">取消</el-button>
        <el-button type="primary" size="small" @click="onUpdateKAInfo">确定修改</el-button>
      </div>
      <div class="footer-buttons" v-else-if="type === 'audit'">
        <el-button size="small" @click="notPassAudit">审核不通过</el-button>
        <el-button type="primary" size="small" @click="passAudit">审核通过</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
  import TabMixin from '@/mixins/tab.mixin'
  import TableMixin from '@/mixins/table.mixin'
  import BaseInfo from '../../components/detail/base.info'
  import PartnerBaseInfo from '../../components/detail/partner.base.info.vue'
  import { LOG_COLUMNS } from './constant'
  import { SHOP_TYPE } from '@/config/common.config.js' // labelToValue
  import { getDetailById } from '@services/partners/attract.investment.service'
  import { getQualificationDetails } from '@/services/partners/qualification.audit.service'
  import { auditShop, getShopDetail, auditShopDetail, getShopLog, addShop, editShop, getDistrictList } from '@/services/partners/shop.service'

  export default {
    mixins: [TabMixin, TableMixin],
    props: {
      opportunityId: {
        type: [Number, String]
      },
      type: {
        type: String
      }
    },
    components: { BaseInfo, PartnerBaseInfo },
    data () {
      return {
        detail: {}, // 商机信息
        partner_detail: {}, // 合伙人基本信息
        addressUrl: 'http://api.map.baidu.com/lbsapi/getpoint/index.html',
        changeText: '', // 审核的变化
        form: {
          shop_type: '', // 合作店类型
          shop_name: '', // 店面名称
          parking_num: '', // 车位总数
          business_time_begin: '', // 营业起始时间
          business_time_end: '', // 营业结束时间
          contact_name: '', // 负责人
          contact_phone: '', // 联系方式
          shop_address: '', // 地址
          address_longitude: '', // 地址经度
          address_latitude: '', // 地址维度
          district_id: '',
          description: '',
          license_img: '',
          signboard_img: ''
        },
        shopType: SHOP_TYPE,
        districtList: [], // 区域列表
        districtListLabel: {},
        license_imgs_list: [],
        signboard_imgs_list: [],
        rules: {
          shop_name: [
            {
              required: true,
              message: '请填写合作店面名称',
              trigger: 'blur'
            },
            {
              max: 15,
              message: '合作店面名称最多输入15字',
              trigger: 'blur'
            }
          ],
          parking_num: [
            {
              required: true,
              message: '请填写车位数',
              trigger: 'blur'
            },
            {
              validator: (rule, value, callback) => {
                if (!(/^[0-9]*$/g.test(value))) {
                  callback(new Error('车位数只能输入整数'))
                }
                if (Number(value) < 1 || Number(value) > 999) {
                  callback(new Error('车位数范围是1-999'))
                }
                callback()
              },
              trigger: 'blur'
            },
          ],
          shop_type: [
            {
              required: true,
              message: '请选择合作店类型',
              trigger: 'blur'
            }
          ],
          business_time_begin: [
            {
              required: true,
              message: '请选择营业起始时间',
              trigger: 'change'
            },
            {
              validator: (rule, value, callback) => {
                if (this.form.business_time_end && value > this.form.business_time_end) {
                  callback(new Error('营业起始时间必须小于结束时间'))
                }
                callback()
              },
              trigger: 'change'
            }
          ],
          business_time_end: [
            {
              required: true,
              message: '请选择营业结束时间',
              trigger: 'change'
            },
            {
              validator: (rule, value, callback) => {
                if (this.form.business_time_begin && this.form.business_time_begin > value) {
                  callback(new Error('营业结束时间必须大于起始时间'))
                }
                callback()
              },
              trigger: 'change'
            }
          ],
          contact_name: [
            {
              required: true,
              message: '请填写合作店面负责人姓名',
              trigger: 'blur'
            },
            {
              max: 15,
              message: '合作店面负责人姓名最多输入15字',
              trigger: 'blur'
            }
          ],
          contact_phone: [
            {
              required: true,
              message: '请填写合作店面联系方式',
              trigger: 'blur'
            },
            {
              validator: (rule, value, callback) => {
                if (!(/^[0-9-]*$/g.test(value))) {
                  callback(new Error('合作店面联系方式只能输入整数'))
                }
                callback()
              },
              trigger: 'blur'
            },
            {
              max: 20,
              message: '合作店面联系方式最多输入20位',
              trigger: 'blur'
            }
          ],
          district_id: [
            {
              required: true,
              message: '请选择区域',
              trigger: 'change'
            }
          ],
          shop_address: [
            {
              required: true,
              message: '请填写合作店面地址',
              trigger: 'blur'
            },
            {
              max: 100,
              message: '合作店面地址最多输入100字',
              trigger: 'blur'
            }
          ],
          address_longitude: [
            {
              required: true,
              message: '请填写详细地址的经纬度-经度',
              trigger: 'blur'
            },
            {
              validator: (rule, value, callback) => {
                if (!(/^[0-9]+([.]{1}[0-9]{1,6}){0,1}$/g.test(value))) {
                  callback(new Error('经纬度只支持整数和小数，小数点最多支持6位'))
                }
                if (Number(value) < 70 || Number(value) > 140) {
                  callback(new Error('经度范围是70～140'))
                }
                callback()
              },
              trigger: 'blur'
            }
          ],
          address_latitude: [
            {
              required: true,
              message: '请填写详细地址的经纬度-纬度',
              trigger: 'blur'
            },
            {
              validator: (rule, value, callback) => {
                if (!(/^[0-9]+([.]{1}[0-9]{1,6}){0,1}$/g.test(value))) {
                  callback(new Error('经纬度只支持整数和小数，小数点最多支持6位'))
                }
                if (Number(value) < 0 || Number(value) > 60) {
                  callback(new Error('经度范围是0～60'))
                }
                callback()
              },
              trigger: 'blur'
            }
          ],
          description: [
            {
              max: 100,
              message: '店铺描述最多100字',
              trigger: 'blur'
            }
          ]
        },
        logColumns: LOG_COLUMNS.call(this)
      }
    },
    activated () {
      this.init()
    },
    computed: {
      city () {
        return this.detail.opportunityDetailVO && this.detail.opportunityDetailVO.city
      },
      // 门店ID
      id () {
        return this.$route.query && this.$route.query.id
      },
      partnerId () {
        return this.detail.opportunityDetailVO && this.detail.opportunityDetailVO.partnerId
      },
      disabledForm () {
        return this.type === 'view' || this.type === 'audit'
      }
    },
    watch: {
      city (val) {
        this.onGetDistrictList(val)
      }
    },
    methods: {
      init () {
        this.onGetOpportunityDetail()
        this.getPartnerDetail()
        if (['edit', 'view', 'audit'].includes(this.type)) {
          this.onGetShopDetail()
          this.onReload()
        }
      },
      async load (table) {
        const { data = [] } = await getShopLog({ id: this.id })
        table.list = data || []
      },
      // 申请添加店面
      async onSubmit () {
        let isValid = false
        this.$refs.shopForm.validate((valid) => {
          isValid = valid
        })
        if (isValid) {
          const params = {
            partner_id: this.partnerId,
            shop_type: this.form.shop_type,
            shop_name: this.form.shop_name,
            parking_num: this.form.parking_num,
            business_time_begin: this.form.business_time_begin,
            business_time_end: this.form.business_time_end,
            contact_name: this.form.contact_name,
            contact_phone: this.form.contact_phone,
            shop_city: this.city,
            district_id: this.form.district_id,
            district_name: this.districtListLabel[this.form.district_id],
            shop_address: this.form.shop_address,
            address_longitude: this.form.address_longitude,
            address_latitude: this.form.address_latitude,
            description: this.form.description,
            license_img: this.license_imgs_list.length > 0 ? this.license_imgs_list[0]['key'] : '',
            signboard_img: this.signboard_imgs_list.length > 0 ? this.signboard_imgs_list[0]['key'] : ''
          }
          await addShop(params)
          this.$notify.success({
            message: '合作店面添加成功'
          })

          this.onCloseTab({ name: 'shopList' })
        }
      },
      async notPassAudit () { // 审核不通过
        await this.$confirm('是否确认“审核不通过”？确定后，则修改的数据不更新，本次修改的数据也不保存', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await auditShop({
          id: this.id,
          audit_status: 30
        })
        this.onCloseTab({ name: 'shopList' })
      },
      async passAudit () { // 审核通过
        await auditShop({
          id: this.id,
          audit_status: 20
        })
        this.onCloseTab({ name: 'shopList' })
      },
      onCancel () {
        this.onCloseTab({ name: 'shopList' })
      },
      async onUpdateKAInfo () {
        let isValid = false
        this.$refs.shopForm.validate((valid) => {
          isValid = valid
        })
        if (isValid) {
          await this.$confirm('是否确认修改？修改后需审核通过后才可应用于主站等外部展示', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })

          const params = {
            id: this.id,
            partner_id: this.partnerId,
            shop_name: this.form.shop_name,
            shop_type: this.form.shop_type,
            parking_num: this.form.parking_num,
            business_time_begin: this.form.business_time_begin,
            business_time_end: this.form.business_time_end,
            contact_name: this.form.contact_name,
            contact_phone: this.form.contact_phone,
            shop_city: this.city,
            district_id: this.form.district_id,
            district_name: this.districtListLabel[this.form.district_id],
            shop_address: this.form.shop_address,
            address_longitude: this.form.address_longitude,
            address_latitude: this.form.address_latitude,
            description: this.form.description,
            license_img: this.license_imgs_list.length > 0 ? this.license_imgs_list[0]['key'] : '',
            signboard_img: this.signboard_imgs_list.length > 0 ? this.signboard_imgs_list[0]['key'] : ''
          }
          await editShop(params)

          this.$notify.success({
            message: '合作店面信息修改成功'
          })

          this.onCloseTab({ name: 'shopList' })
        }
      },
      // 获取商机基本信息
      async onGetOpportunityDetail () {
        const { data } = await getDetailById({ id: this.opportunityId })
        this.detail = data
      },
      // 获取合伙人基本信息
      async getPartnerDetail () {
        const { data } = await getQualificationDetails({ opportunity_id: this.opportunityId })
        this.partner_detail = data
      },
      // 获取门店详情
      async onGetShopDetail () {
        this.license_imgs_list = []
        this.signboard_imgs_list = []
        let data = null
        if (['edit', 'view'].includes(this.type)) {
          const result = await getShopDetail({ id: this.id })
          data = result.data
        } else if (['audit'].includes(this.type)) {
          const result = await auditShopDetail({ id: this.id })
          data = result.data.audit_content
          this.changeText = result.data.change_text
        }
        this.form = Object.assign({}, this.form, data)
        // 处理图片数据
        if (data.license_img) {
          this.license_imgs_list.push({
            key: data.license_img,
            url: ''
          })
        }
        if (data.signboard_img) {
          this.signboard_imgs_list.push({
            key: data.signboard_img,
            url: ''
          })
        }
      },
      // 获取区域列表
      async onGetDistrictList (city) {
        const { data } = await getDistrictList({ city_name: city })

        const arr = []
        const objLabel = {}
        for (const item of data) {
          arr.push({ label: item.district_name, value: item.district_id.toString() })
          objLabel[item.district_id] = item.district_name
        }
        this.districtList = arr
        this.districtListLabel = Object.assign({}, objLabel)
      }
    }
  }
</script>
<style lang="scss">
@include b(detail) {
  @include e(title) {
    font-size: 16px;

    .el-button {
      margin-left: 10px;

      > span {
        font-size: 14px;
      }
    }

    .callphone span {
      font-size: 14px;
    }
  }
}

.rc-partners-ka-detail {
  .shop-title {
    color: #000;
    font-size: 15px;
  }

  .notify {
    font-size: 14px;
    color: #ff6b23;
  }

  .footer-buttons {
    text-align: center;
  }
}
</style>
