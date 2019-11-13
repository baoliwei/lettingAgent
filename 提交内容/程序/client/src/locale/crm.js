export default {
  // 双约工单
  crm: {
    // 双约工单/订单回访-车源信息
    car_meta_data: {
      'title': '车源名称',
      'rrc_id': '车源编号',
      'first_publish_time': '上架日期',
      'car_status': '车源状态',
      'mileage': '里程',
      'car_color': '颜色',
      'licensed_date': '上牌日期',
      'displacement': '排量',
      'car_city': '车源城市',
      'transmission': '变速器',
      'licensed_city': '上牌城市',
      'emission': '排放标准',
      'refer_price': '评估师建议售价',
      'grade': '车源评级',
      'reserve_price': '车主底价'
    },
    // 双约工单-车主信息
    car_owner: {
      'name': '车主姓名',
      'appointment_addr': '看车地址',
      'car_owner_reve': '车主底价',
      'last_maintain_time': '最后维护时间'
    },
    // 双约工单-车商信息
    car_dealer: {
      name: '车商姓名',
      'bid': '出价',
      bid_time: '出价时间',
      bid_status: '出价状态',
      bid_freeze_deposit: '出价冻结保证金',
      deposit_available: '可用保证金金额'
    },
    // 车源维护-出价记录
    bid_info: {
      'bid_create_time': '出价时间',
      'car_dealer_bid_price': '车商出价',
      'bind_price_status': '出价状态',
      'car_dealer_id': '车商编号',
      'car_dealer_name': '车商姓名',
      'deposit_interval': '冻结金额',
      'car_dealer_city': '车商所在地',
      'sale_name': '所属BD',
      'check_car_status': '看车顺序'
    },
    // 订单回访-订单信息
    'sale_order_data': {
      'sale_order_id': '订单号',
      'sale_order_created_at': '创建时间',
      'sale_order_status': '订单状态',
      'sales': '带看销售',
      'cc': '电话销售',
      'inspector': '评估师',
      'sale_order_appointment_at': '看车时间',
      'appointment_addr': '看车地点',
      'cc_remark': 'CC备注',
      'car_owner': '车主',
      'car_dealer': '车商',
      'double_appointment_id': '关联工单'
    },
    // 订单回访-成交信息
    'deal_data': {
      'deal_price': '成交价（万元）',
      'service_charge': '应收服务费',
      'ac_coupons': '活动',
      'receivable_service_charge': '实际服务费',
      'sign_electronic_contract': '是否签署电子合同'
    },
    // 订单回访-支付信息
    'payinfo': {
      'coupon': '优惠券',
      'service_fee': '实收服务费'
    },
    // 订单回访-基本信息
    'sales_order_callback_info': {
      'sales_callback_id': '订单回访编号',
      'sales_callback_status': '订单回访状态',
      'sales_callback_type': '订单回访类型',
      'callback_create_time': '订单回访创建时间'
    },
    // 工单结果
    work_order: {
      double_appointment_result: '双约结果',
      double_appointment_status: '双约结果',
      st_saleorder_appointment_time: '带看时间',
      st_saleorder_appointment_addr: '看车地点',
      double_appointment_remark: '工单备注',
      st_saleorder_remark: '派单备注',
      fail_duty: '失败责任', // 暂存对象 失败责任
      // 这里 是三个原因集合 到时候 根据条件手动处理下 当失败责任 是车主时 原因是 失败原因是车商时 是 违约原因
      fail_reason: '暂存原因', // 失败原因 违约原因 暂存原因
      double_appointment_reason_shibai: '失败原因',
      double_appointment_reason_weiyu: '违约原因',
      fail_reason_detail: '详细原因',
      st_next_car_maintain_time: '下次车源维护时间',
      // 下次双约工单回访时间
      next_callback_time: '回访时间',
      callback_time: '回访时间',
      st_withdraw_car: '是否下架',
      st_sold_channel: '售车渠道',
      st_sold_price: '卖出价格',
      st_withdraw_car_channel: '下架渠道'
    }
  }
}
