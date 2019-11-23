<template>
  <ElCascader v-bind="$attrs" ref="cas" v-model="value"></ElCascader>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      default: () => []
    }
  },
  mode: {
    prop: 'value',
    event: 'change'
  },
  created() {
    // this.setDefaultValue()
  },
  methods: {
    setDefaultValue() {
      const { props } = this.$attrs
      const { value = 'value', children = 'children' } = props
      if (this.value.length) {
        this.quene(this.value).then(res => {
          this.value.reduce((prev, cur, index) => {
            let prevEl = res[index - 1].find(
              e => e[value] === this.value[index - 1]
            )
            prevEl[children] = res[index]
          })
          this.options = res[0]
        })
      }
    },
    async quene(arr) {
      let vm = this
      let { props } = vm.$attrs
      const promises = arr.map(async id => {
        const promise = new Promise(resolve => {
          props.lazyLoad({ [props.value || 'value']: id, leaf: true }, resolve)
          // resolve({label: 1, value: 1})
        })
        return await promise
      })

      let ret = []

      for (const promise of promises) {
        ret.push(await promise)
      }
      return ret
    }
  }
}
</script>