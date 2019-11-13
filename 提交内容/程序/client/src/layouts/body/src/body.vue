 <template>
  <div class="rc-body highHeightTop">
    <rc-sidebar ref="sidebarMenu" v-if="couldShowSidebar"></rc-sidebar>
    <rc-content :class="{ fullScreen: !couldShowSidebar }">
      <rc-tabs slot="tabs"></rc-tabs>
      <rc-cache :include="tabs">
        <router-view :key="$route.fullPath"/>
      </rc-cache>
    </rc-content>
  </div>
</template>
<script>
import rcCache from './cache'

export default {
  name: 'rc-body',
  components: {
    rcCache
  },
  computed: {
    tabs () {
      return this.$store.state.tabs.tabs.filter(item => {
        return item.meta.keepAlive
      }).map(item => item.name)
    },
    couldShowSidebar () {
      return !(this.$route.query.refer && this.$route.query.refer.indexOf('order_after_sale') > -1)
    }
  }
}
</script>
<style lang="scss">
@import 'scss/variables';
@import 'scss/mixins/mixin';

.rc-body {
  position: absolute;
  width: 100%;
  transition: top 0.3s ease-in-out;
  bottom: 0;
  background-color: $bg-color;
  z-index: 100;
  .fullScreen {
    left: 0;
  }
}

.defaultHeight {
  height: $header-height;
}
.highHeight {
  height: $high-header-height;
}
.defaultHeightTop {
  top: $header-height;
}
.highHeightTop {
  top: $high-header-height;
}
</style>
