import { userStore } from './store/user'

App({
  userStoreBindings: null as any,

  onLaunch() {
    userStore.getUserInfo()
    userStore.getDesireValue()
  },
})
