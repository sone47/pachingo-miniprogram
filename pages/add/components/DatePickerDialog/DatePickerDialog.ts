// pages/add/components/DatePickerDialog/DatePickerDialog.ts
Component({
  properties: {
    value: {
      type: String,
      optionalTypes: [String, null],
    },
    pickerTitle: {
      type: String,
      value: '请选择开始时间',
    },
    startTime: {
      type: String,
      optionalTypes: [String, null],
    },
    endTime: {
      type: String,
      optionalTypes: [String, null],
    },
  },

  data: {
    dateVisible: false,
  },

  methods: {
    handleButtonClick() {
      this.setData({ dateVisible: true })
    },

    handleDateConfirm(e: { detail: { value: string } }) {
      this.setData({ value: e.detail.value })
    },

    handleDateClear() {
      this.setData({ value: null })
    },
  },
})
