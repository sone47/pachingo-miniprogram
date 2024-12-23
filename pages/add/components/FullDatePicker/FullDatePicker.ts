import dayjs from 'dayjs'

import { formatDate } from '@utils/date'

Component({
  properties: {
    startTime: null,
    endTime: null,
  },

  /**
   * Component initial data
   */
  data: {
    startTimeThreshold: formatDate(),
    endTimeThreshold: formatDate(dayjs().add(1, 'year')),
    startTimeEndTimeThreshold: '',
    endTimeStartTimeThreshold: '',
  },

  observers: {
    startTime() {
      this.setData({
        endTimeStartTimeThreshold: dayjs(this.data.startTimeThreshold).isBefore(this.data.startTime)
          ? this.data.startTime
          : this.data.startTimeThreshold
      })
      this.triggerEvent('starttimechange', this.data.startTime)
    },
    endTime() {
      this.setData({
        startTimeEndTimeThreshold: dayjs(this.data.endTimeThreshold).isAfter(this.data.endTime)
          ? this.data.endTime
          : this.data.endTimeThreshold
      })
      this.triggerEvent('endtimechange', this.data.endTime)
    },
  },

  lifetimes: {
    created() {
      this.setData({
        startTime: null,
        endTime: null,
      })
    }
  }
})