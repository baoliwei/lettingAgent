import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

export function report () {
  try {
    Raven
      .config('https://763d30fd2e4a4cc3810a01c7e9ce3ad0@busi-sentry.shanyishanmei.com/11', {
        release: process.env.ANNE_APP_PROJECT_RELEASE || 'test'
      })
      .addPlugin(RavenVue, Vue)
      .install()
  } catch (e) {
    console.log('vue sentry注册失败', e)  // eslint-disable-line
  }
}
