<template>
 <div class="menu-item-box">
      <template v-if="!menuData.children && menuData.isShow">
        <el-menu-item :index="menuData.path">
          <router-link class="router-link" tag="p" :to="menuData.path">
            <i class="rc-sidebar-icon" v-if="menuData.icon" :class="[menuData.icon]"/>
            <span>{{ menuData.name }}</span>
            <el-badge v-if="menuData.orderNum" :value="menuData.orderNum" :max="999" class="item"/>
          </router-link>
        </el-menu-item>
     </template>
     <template v-if="menuData.children && menuData.isShow">
      <el-submenu :index="menuData.name">
        <template slot="title">
          <i v-if="menuData.icon" :class="[menuData.icon]"/>
          <span>{{ menuData.name }}</span>
        </template>
        <rc-menu v-for="(item,index) in menuData.children" :menuData="item" :key="'recursion' + index"/>
      </el-submenu>
     </template>
  </div>
</template>
<script>
export default {
  name: 'rc-menu',
  data () {
    return {
    }
  },
  props: {
    menuData: {
      type: Array | Object
    }
  },
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
.menu-item-box [role='menuitem']{
  padding: 0 !important;

  .el-submenu__title{
    padding-left: 10px !important;
    padding-right: auto;
  }
}
.el-menu-item{
    .router-link{
      padding-left: 10px;
      font-size: 14px;
      .rc-sidebar-icon{
        font-size: 18px;
        width: 24px;
        text-align: center
      }
    }
}
.el-submenu{
    .router-link{
      padding-left: 30px;
    }
  }
@include b(sidebar) {
  position: absolute;
  left: 0;
  top: 0;
  width: $side-bar-width;
  bottom: 0;
  background-color: $bj;
  z-index: 102;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: padding-top 0.3s;

  .el-scrollbar__wrap {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .el-menu {
    background-color: $bj;
    .el-menu-item,
    .el-submenu__title {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #505050;
      min-width: auto;
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

    .el-submenu {
      // 打开子菜单
      &.is-active {
        .el-submenu__title {
          color: $primary;
        }

        @extend %icon;
      }
    }

    .el-badge {
      vertical-align: middle;
      float: right;
      margin-right: 15px;
    }
  }
}

@include b(sidebar-icon) {
  margin-right: 10px;
  font-size: 14px;
}
</style>
