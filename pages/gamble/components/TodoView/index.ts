import dayjs from 'dayjs'

import { EventStatusEnum } from '@/constant/index'
import { Desire } from '@/api/types'

Component({
  properties: {
    data: {
      type: Array as unknown as Desire[],
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
    handleComplete(event: { detail: { item: Desire } }) {
      this.triggerEvent('complete', event.detail.item)
    },

    handleRollback(event: { detail: { item: Desire } }) {
      this.triggerEvent('rollback', event.detail.item)
    },
  },
})
