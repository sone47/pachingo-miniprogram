Component({
  properties: {
    iconName: {
      type: String,
      value: 'heart',
    },
    value: {
      optionalTypes: [Number, String],
    },
    isFilled: {
      type: Boolean,
      value: true,
    },
    iconSize: {
      type: Number,
      value: 18,
    },
    isValueInsideIcon: {
      type: Boolean,
      value: false,
    },
  },
})