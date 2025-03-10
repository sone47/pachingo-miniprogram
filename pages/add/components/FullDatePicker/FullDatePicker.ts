import dayjs from 'dayjs'

import { formatDate } from '@/utils/date'

Component({
  properties: {
    startTime: null,
    endTime: null,
  },

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
          : this.data.startTimeThreshold,
      })
    },
    endTime() {
      this.setData({
        startTimeEndTimeThreshold: dayjs(this.data.endTimeThreshold).isAfter(this.data.endTime)
          ? this.data.endTime
          : this.data.endTimeThreshold,
      })
    },
  },

  lifetimes: {
    created() {
      this.setData({
        startTime: null,
        endTime: null,
      })
    },
  },
})
