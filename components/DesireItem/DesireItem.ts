import { EventStatusEnum } from '@constant/index'

Component({
  properties: {
    data: {
      type: Object,
      value: () => ({}),
    },
    completable: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    isComplete: false,
  },

  lifetimes: {
    attached() {
      if (this.data.completable) {
        this.setData({
          isComplete: this.data.data.status === EventStatusEnum.Done
        })
      }
    },
  },

  methods: {
    handleCompleteCheckedChange(event) {
      const checked = event.detail.checked
      if (checked) {
        this.triggerEvent('complete', {
          item: this.data.data,
        })
      } else {
        this.triggerEvent('rollback', {
          item: this.data.data,
        })
      }
    },
  }
})