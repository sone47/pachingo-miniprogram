import dayjs from 'dayjs'

import { EventStatusEnum } from '@constant/index'

Component({
  properties: {
    data: {
      type: Array,
      value: [],
    },
  },

  data: {
    countDownTime: dayjs().endOf('day').valueOf() - Date.now(),
    EventStatusEnum,
  },

  /**
   * Component methods
   */
  methods: {
    handleComplete(event) {
      this.triggerEvent('complete', event.detail)
    },

    handleRollback(event) {
      this.triggerEvent('rollback', event.detail)
    },
  },
})
