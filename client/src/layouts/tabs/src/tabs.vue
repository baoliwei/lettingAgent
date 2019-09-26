<template>
  <div class="rc-tabs">
    <el-tabs
      :value="currentTab"
      @tab-click="onTabClick"
      @tab-remove="onTabRemove">
      <el-tab-pane class="rc-tabs__no-close" label="首页" name="home">
      </el-tab-pane>
      <el-tab-pane
        v-for="(tab, index) in tabs"
        :key="'tab' + index"
        :closable="isShowCloseButton(tab)"
        :label="tab.label"
        :name="tab.name">
      </el-tab-pane>
    </el-tabs>
    <el-dropdown @command="onCommand">
      <span class="el-dropdown-link">
        <i class="rc-icon-tool el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
        <el-dropdown-item command="closeOther">关闭其它</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'rc-tabs',
  computed: {
    ...mapState({
      current: state => state.tabs.currentTab
    }),
    ...mapGetters({
      tabs: 'getTabs'
    }),
    currentTab: {
      get () {
        return this.current
      },
      set (val) {
        this.selectTab(val)
      }
    }
  },
  methods: {
    ...mapMutations({
      selectTab: 'CURRENT_TAB',
      deleteTab: 'DELETE_TAB',
      commandTab: 'TABS_TOOLS_COMMAND'
    }),
    onTabClick (tab) {
      let name = tab.name
      // 如果当前 tab 是当前tab 不进行路由刷新
      if (this.$route.name === name) {
        return
      }
      // 如果是首页 直接调首页 因为首页是默认的
      if (name === 'home') {
        this.$router.push('/')
        return
      }
      let currentTab = this.tabs.filter(item => item.name === name)[0]
      currentTab && this.$router.push(currentTab.fullPath)
    },
    onTabRemove (tab) {
      this.deleteTab(tab)
    },
    // 处理更多操作
    onCommand (command) {
      this.commandTab(command)
    },
    isShowCloseButton (tab) {
      return tab.fullPath.indexOf('popOnScreen') === -1
    }
  }
}
</script>
<style lang="scss">
@import 'scss/variables';
@import 'scss/mixins/mixin';

@include b(tabs) {
  position: relative;
  padding: 0 10px;
  background-color: #fff;

  @include e(no-close) {
    i.el-icon-close {
      display: none;
    }
  }

  .el-tabs {
    padding-right: 30px;
  }

  .el-dropdown {
    text-align: center;
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
  }

  .el-tabs__header {
    margin: 0;
  }

  .el-tabs__item {
    font-weight: normal;
    font-size: 12px;
  }

  .el-tabs__item.is-active {
    color: $primary;
  }

  .el-tabs__nav-wrap::after {
    height: 1px;
    background-color: #f1f1f1;
  }
}
</style>
