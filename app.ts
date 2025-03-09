import { userStore } from './store/user'

App({
  onLaunch() {
    userStore.getUserInfo()
    userStore.getDesireValue()
  },
})
