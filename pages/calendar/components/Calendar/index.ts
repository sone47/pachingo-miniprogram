import dayjs from 'dayjs'

import { formatDateTime } from '@utils/date'

Component({
  properties: {
    date: {
      type: Number,
      value: Date.now(),
      observer() {
        const dateTime = formatDateTime(this.data.date, 'YYYY-MM-DD')
        this.setData({
          dateFormatString: dateTime,
        })
      },
    },
  },

  /**
   * Component initial data
   */
  data: {
    minDate: dayjs().subtract(1, 'year').valueOf(),
    maxDate: Date.now(),
    dateFormatString: formatDateTime(Date.now(), 'YYYY-MM-DD'),
  },

  methods: {
    async handleSelect(event) {
      const dateTimestamp = event.detail.value
      this.triggerEvent('select', { value: dateTimestamp })
    },
  },
})
