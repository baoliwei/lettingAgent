<template>
  <div class='rc-sidebar' >
    <el-menu class="rc-sidebar rc-sidebar__scroll"
      :default-active="selected"
      :unique-opened="false"
      :default-openeds="defaultOpenedsArr"
      @select="select" >
      <Menu v-for="(item) in menuConfig" :key="item.name" :menuData="item"/>
    </el-menu>
  </div>
</template>
<script>
import Menu from './menu.vue'
import menuConfig from '@/config/menu.config.js'

export default {
  name: 'rc-sidebar',
  data () {
    const initSelected = this.$route.path || 'home'
    return {
      menuConfig: menuConfig,
      selected: initSelected,
      orderCountData: {}, // 待退款待处理订单数
      approvalOrderCount: 0, // 待审核订单数
      defaultOpenedsArr: [],
      complaintOrderNum: 0,
      punishOrderNum: 0, // 罚单列表
    }
  },
  components: {
    Menu: Menu
  },
  computed: {
  },
  created () {
    this.init()
  },
  methods: {
    // 初始化
    async init () {
      console.log('初始化导航')
      this.checkLicense()
      // 获取默认显示二级菜单项
      this.defaultOpenedsArr = this.menuConfig.filter(item => item.defaultOpened).map(item => item.name)
    },
    // 初始化选中
    initSelected (to) { // 初始化选中状态
      const { meta, path } = to
      if (meta && meta.isMenu) {
        this.selected = path
      }
    },
    // 选中菜单
    select (index) {
      this.selected = index
    },
    // 校验是否显示菜单
    checkLicense () {
      this.menuConfig = this.helpHandleMenu(this.menuConfig, this.handleMenu)
    },
    // 辅助函数
    helpHandleMenu (arr, callback) {
      const copy = JSON.parse(JSON.stringify(arr))
      return copy.map(menu => {
        if (menu.children && menu.children.length > 0) {
          menu.children = this.helpHandleMenu(menu.children, callback)
        }
        return callback.call(this, menu)
      })
    },
    // 处理单个Menu
    handleMenu (menu) {
      const auth = !!this[menu.rule] || !menu.rule || !!this.$store.getters[menu.rule]
      if (auth && menu.children && menu.children.length > 0) {
        menu.isShow = menu.children.some(subMenu => subMenu.isShow)
      } else {
        menu.isShow = auth
      }
      return menu
    }
  },
  watch: {
    $route () {
      this.init()
    }
  }
}
</script>
<style lang="scss">
@import 'scss/variables';
@import 'scss/mixins/mixin';
@import 'scss/element.variables';
$bj: #fff;

%icon {
  i.rc-sidebar-icon {
    color: $primary;
  }
}
@include b(sidebar) {
  left: 0;
  width: $side-bar-width;
  transition: top 0.3s ease-in-out;
  bottom: 0;
  background-color: $bj;
  z-index: 102;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  padding: 16px 0;
  height: calc(100% - 40px);
  overflow: hidden;

  &.rc-sidebar__scroll {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &.el-menu {
    background-color: $bj;

    .el-menu-item,
    .el-submenu__title {
      height: 34px;
      line-height: 34px;
      font-size: 14px;
      color: #505050;

      &:hover,
      &:focus {
        outline: none;
        background-color: $--select-option-hover-background;
      }

      span {
        padding-left: 10px;
      }

      // 选中状态
      &.is-active {
        background: $--select-option-hover-background;
        color: $primary;
        position: relative;

        @extend %icon;

        &::after {
          content: "";
          height: 100%;
          width: 4px;
          position: absolute;
          top: 0;
          left: 0;
          background-color: $primary;
        }
      }
    }
    .el-menu-item-group{
      .el-menu-item {
        margin-left: -20px;
        .item {
          float: right;
          margin: 0 0 0 4px;
        }
      }
    }

    .el-submenu {
      // 打开子菜单
      &.is-active {
        .el-submenu__title {
          color: $primary;
        }

        @extend %icon;
      }
      .el-menu {
        overflow: hidden;
      }
    }
  }
}

@include b(sidebar-icon) {
  margin-right: 10px;
  font-size: 14px;
}
</style>
