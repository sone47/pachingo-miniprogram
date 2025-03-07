import { EventStatusEnum } from '@/constant/index'

Component({
  properties: {
    data: {
      type: Object,
      value: () => ({}),
      observer(newValue) {
        if (this.data.completable) {
          this.setData({
            isComplete: newValue.status === EventStatusEnum.Done,
          })
        }
      },
    },
    completable: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    EventStatusEnum,
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
  },
})
