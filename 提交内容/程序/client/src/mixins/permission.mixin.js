export default {
  computed: {
    restrictedUser () {
      return this.$store.state.user.userInfo.restrictedUser
    }
  },
  methods: {
    /**
     * 权限码配置
     */
    isPermission (permission) {
      const { permissions } = this.$store.state.user.userInfo
      if (permissions) {
        return permissions.findIndex((value) => value === permission) !== -1
      }
      return false
    }
  }
}
