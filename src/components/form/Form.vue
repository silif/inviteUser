<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'VForm',
  componentName: 'VForm',
  data () {
    return { fields: [] }
  },
  provide () {
    return {
      form: this
    }
  },
  props: {
    model: { type: Object },
    rules: { type: Object }
  },
  methods: {
    resetFields () {
      this.fields.forEach(field => field.resetField())
    },
    validate (callback) {
      let promise
      if (typeof callback !== 'function') {
        promise = new Promise((resolve, reject) => {
          callback = function (valid) {
            valid ? resolve(valid) : reject(valid)
          }
        })
      }
      let valid = true
      let count = 0
      if (this.fields.length === 0 && callback) {
        callback(true)
      }
      let invalidFields = {}
      this.fields.forEach(field => {
        field.validate('', (message, field) => {
          if (message) {
            valid = false
          }
          invalidFields = { ...{}, ...invalidFields, ...field }
          if (typeof callback === 'function' && ++count === this.fields.length) {
            callback(valid, invalidFields)
          }
        })
      })
      return promise
    }
  },
  created () {
    this.$on('addField', field => {
      if (field) {
        this.fields.push(field)
      }
    })
    this.$on('removeField', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1)
      }
    })
  }
}
</script>
