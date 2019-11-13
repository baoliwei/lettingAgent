// 时间类型
export const TIME_TYPE = {
  success: '成单时间',
  transfer: '过户时间',
  test: '检测时间',
  follow: '跟进时间',
  appoint_test: '预约检测',
  appoint_transfer: '预约过户',
  archive: '建档时间',
  refund: '退订时间',
  last_modified: '最后修改'
}

// 是否贷款
export const IS_LOAN = {
  0: '是',
  1: '否'
}

// 车辆来源
export const CHANNEL = {
  0: '个人',
  1: '4S店',
  2: '洗车店',
  3: '疑似车商',
  4: '车商'
}

// 责任人操作显示
export const changeResponsibilityShowStatus = ['unappoint', 'untested', 'untransfered', 'applyrefund']

// 贷款状态
const loanStatus = {
  '': '无',
  'UNFOLLOW': '待跟进',
  'COLLECT': '提交资料',
  'COMMIT': '待审批',
  'THROUGH': '审批通过',
  'REFUSE': '审批未通过',
  'LOANTRANSFER': '贷款过户',
  'FULLTRANSFER': '全款过户',
  'ABANDON': '放弃购车',
  'RETURN': '未贷款待退费',
  'GIVEUP': '放弃贷款'
}

// 建档时间规范
const timeFormat = {
  '0000-00-00 00:00:00': '-',
  '1970-01-01 00:00:00': '-'
}

// 全部列表数据
export const COLUMNS_TOTAL = function (type) {
  const _this = this
  const permission = _this.isPermission('operation_monitoring_button_view')
  // 多选
  const selection = [
    {
      type: 'selection',
      align: 'center',
      'min-width': 40
    }
  ]
  // 基本列
  const baseColumns = [
    {
      prop: 'id',
      label: '订单号',
      align: 'center',
      'min-width': 85,
      render (h, scope) {
        return (
          <a href="javascript:;" onClick={_this.seeDetail.bind(_this, scope.row)}>{scope.row.id}</a>
        )
      }
    },
    {
      prop: 'aftersale_source',
      label: '业务来源',
      align: 'center',
      'min-width': 96
    },
    {
      label: '带看销售',
      align: 'center',
      'min-width': 96,
      render (h, scope) {
        // 换行
        return (
          <span>{scope.row.sale_name}<br/>{scope.row.sale_phone}</span>
        )
      }
    },
    {
      prop: 'rrc_id',
      label: '车源编号',
      align: 'center',
      'min-width': 76
    },
    {
      label: '车型/详情',
      align: 'center',
      'min-width': 150,
      render (h, scope) {
        return (
          // 链接
          <a href="javascript:;" onClick={_this.seeCarInfo.bind(_this, scope.row.car_id)}>{scope.row.car_brief}</a>
        )
      }
    },
    {
      prop: 'deal_time',
      label: '成单时间',
      align: 'center',
      'min-width': 96,
      sortable: 'custom',
      render (h, scope) {
        const arr = scope.row.deal_time.split(' ')
        return (
          <span>{arr[0]}<br/>{arr[1]}</span>
        )
      }
    },
    {
      prop: 'follow_time',
      label: '跟进时间',
      align: 'center',
      'min-width': 96,
      sortable: 'custom',
      render (h, scope) {
        const arr = scope.row.follow_time.split(' ')
        return (
          <span>{arr[0]}<br/>{arr[1]}</span>
        )
      }
    }
  ]
  // 责任人
  const allocator = [
    {
      prop: 'allocatorName',
      label: '责任人',
      align: 'center',
      'min-width': 70
    }
  ]
  // 过户审核状态
  const examineStatus = [
    {
      prop: 'examine_status',
      label: '过户审核状态',
      align: 'center',
      'min-width': 74
    }
  ]
  // 末尾列
  const endColumns = [
    {
      prop: 'transfer_type',
      label: '过户类型',
      align: 'center',
      'min-width': 70
    },
    {
      prop: 'need_check',
      label: '是否检测',
      align: 'center',
      'min-width': 56
    },
    {
      prop: 'status',
      label: '状态',
      align: 'center',
      'min-width': 50
    }
  ]
  // 买家卖家保证金状态
  const marginStatusColumns = [
    {
      type: 'expand',
      width: 1,
      render (h, scope) {
        const isShow = scope.row.buyer_margin_status || scope.row.seller_margin_status
        const { follow_time: followTime, deal_time: dealTime } = scope.row
        let classN = 'expand'
        if (followTime === dealTime) {
          const followTimeM = Date.parse(followTime)
          const now = new Date().getTime()
          const diff = (now - followTimeM) / (1000 * 60 * 60)
          if (diff > 1) {
            classN = 'expand dangerRow'
          }
        }
        return (
          <span>
            {isShow ? <span class={classN}>
              <span>
                买家保证金状态：{MARGIN_STATUS[scope.row.buyer_margin_status]}
                <span class="primary">{_this.getRefundTip('buyer', scope.row)}</span>
              </span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>
                卖家保证金状态：{MARGIN_STATUS[scope.row.seller_margin_status]}
                <span class="primary">{_this.getRefundTip('seller', scope.row)}</span>
              </span>
            </span> : ''}
          </span>
        )
      }
    }
  ]
  // 操作
  const opration = [
    {
      label: '操作',
      align: 'center',
      fixed: 'right',
      'min-width': 110,
      render (h, scope) {
        // 查看
        const isDetail = _this.isPermission('aftersale_query_order')
        // 查看资料
        const isViewTransferData = _this.isPermission('aftersale_archives_detail_button')
        return (
          <div>
            {isDetail ? <el-button type="text" class="primary" onClick={_this.seeDetail.bind(_this, scope.row)}>查看</el-button> : ''}
            {isViewTransferData ? <el-button type="text" class="blue" onClick={_this.toArchive.bind(_this, scope.row)}>查看资料</el-button> : ''}
          </div>
        )
      }
    }
  ]
  switch (type) {
    // 全部
    case 'total':
      return [
        ...baseColumns,
        ...allocator,
        ...endColumns,
        ...opration
      ]
    // 待预约
    case 'unappoint':
      const arrUnappoint = [
        ...baseColumns,
        ...allocator,
        ...endColumns,
        {
          prop: 'loan_status',
          label: '贷款状态',
          align: 'center',
          'min-width': 50,
          render (h, scope) {
            return loanStatus[scope.row.loan_status] || loanStatus['']
          }
        },
        ...opration
      ]
      return permission ? [...selection, ...arrUnappoint] : arrUnappoint
    // 待检测
    case 'untested':
      const arrUntested = [
        ...baseColumns,
        ...allocator,
        ...endColumns,
        ...opration
      ]
      return permission ? [...selection, ...arrUntested] : arrUntested
    // 待过户
    case 'untransfered':
      // 买卖家保证金
      const arrUntransfered = [
        ...marginStatusColumns,
        ...baseColumns,
        ...allocator,
        ...endColumns,
        ...examineStatus,
        ...opration
      ]
      return permission ? [...selection, ...arrUntransfered] : arrUntransfered
    // 已过户
    case 'transfered':
      // 买卖家保证金
      return [
        ...marginStatusColumns,
        ...baseColumns,
        ...endColumns,
        ...examineStatus,
        ...opration
      ]
    // 待退订
    case 'applyrefund':
      const arrApplyRefund = [
        {
          label: '订单号',
          align: 'center',
          'min-width': 88,
          render (h, scope) {
            return (
              <a href="javascript:;" onClick={_this.seeDetail.bind(_this, scope.row)}>{scope.row.id}</a>
            )
          }
        },
        {
          label: '带看销售',
          align: 'center',
          'min-width': 96,
          render (h, scope) {
            return (
              <span>
                {scope.row.sale_name}<br/>{scope.row.sale_phone}
              </span>
            )
          }
        },
        {
          prop: 'rrc_id',
          label: '车源编号',
          align: 'center',
          'min-width': 76
        },
        {
          label: '车型/详情',
          align: 'center',
          'min-width': 156,
          render (h, scope) {
            return (
              <a href ="javascript:;" onClick={_this.seeCarInfo.bind(_this, scope.row.car_id)}>{scope.row.car_brief}</a>
            )
          }
        },
        {
          prop: 'refund_info.return_responsible',
          label: '原因方',
          align: 'center',
          'min-width': 70
        },
        {
          label: '原因',
          align: 'center',
          'min-width': 60,
          render (h, scope) {
            return (
              <div>
                <div>{scope.row.refund_info.reason_category}</div>
                <div>{scope.row.refund_info.reason_description}</div>
              </div>
            )
          }
        },
        {
          prop: 'refund_info.C1_follow_up',
          label: 'C1跟进',
          align: 'center',
          'min-width': 100
        },
        {
          prop: 'refund_info.C2_follow_up',
          label: 'C2跟进',
          align: 'center',
          'min-width': 100
        },
        {
          prop: 'refund_info.remark',
          label: '备注',
          align: 'center',
          'min-width': 100
        },
        {
          label: '操作',
          align: 'center',
          fixed: 'right',
          'min-width': 110,
          render (h, scope) {
            // 查看资料
            const isViewTransferData = _this.isPermission('aftersale_archives_detail_button')
            return (
              <div>
                {isViewTransferData ? <el-button type="text" class="primary" onClick={_this.toArchive.bind(_this, scope.row)}>查看资料</el-button> : ''}
              </div>
            )
          }
        }
      ]
      return permission ? [...selection, ...arrApplyRefund] : arrApplyRefund
    // 已退订
    case 'refuned':
      // 买卖家保证金
      return [
        ...marginStatusColumns,
        ...baseColumns,
        ...endColumns,
        {
          prop: 'refund_time',
          label: '退订时间',
          align: 'center',
          'min-width': 100,
          render (h, scope) {
            const time = timeFormat[scope.row.refund_time]
            if (time === '-') {
              return time
            } else {
              const arr = scope.row.refund_time.split(' ')
              return (
                <span>{arr[0]}<br/>{arr[1]}</span>
              )
            }
          }
        },
        ...opration
      ]
  }
}

// 订单列表tabs
export const AFTERSALE_TABS = {
  total: '',
  unappoint: 'SUCCEEDED',
  untested: 'UNTESTED',
  untransfered: 'UNTRANSFERED',
  transfered: 'TRANSFERED',
  archiving: 'ARCHIVING',
  applyrefund: 'APPLYREFUND',
  refuned: 'REFUNDED',
  dismissed: 'DISMISSED'
}

// 保证金状态
export const MARGIN_STATUS = {
  0: '已收款',
  1: '已提交待打款',
  2: '申请驳回',
  3: '退款有问题',
  4: '已打款-有剩余',
  5: '已打款-无剩余'
}
