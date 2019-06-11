<template>
  <div class="formitem">
    <div class="flex">
      <label v-if="label" class="label">{{ label }}</label>
      <slot></slot>
    </div>
    <div class="message">
      <span v-if="showMsg" >{{message}}</span>
    </div>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator'
import emmiter from '@/mixin/emmiter'
export default {
  name: 'FormItem',
  componentName: 'FormItem',
  mixins: [emmiter],
  props: {
    label: { type: String, default: '' },
    prop: { type: String }
  },
  provide () {
    return { formItem: this }
  },
  inject: ['form'],
  data () {
    return {
      showMsg: false
    }
  },
  computed: {
    fieldValue () {
      return this.form.model[this.prop]
    }
  },
  methods: {
    setRules () {
      let rules = this.getRules()
      if (rules.length) {
        rules.forEach(rule => {
          if (rule.required !== undefined) this.isRequired = rule.required
        })
      }
      this.$on('form.blur', this.onFieldBlur)
      this.$on('form.change', this.onFieldChange)
    },
    getRules () {
      let formRules = this.form.rules
      formRules = formRules ? formRules[this.prop] : []
      return formRules
    },
    onFieldBlur () {
      this.validate('blur')
    },
    onFieldChange () {
      this.validate('change')
    },
    getFilteredRule (trigger) {
      const rules = this.getRules()
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },
    validate (trigger, cb) {
      let rules = this.getFilteredRule(trigger)
      if (!rules || rules.length === 0) return true
      const validator = new AsyncValidator({ [this.prop]: rules })
      let model = { [this.prop]: this.fieldValue }
      validator.validate(model, { firstFields: true }, errors => {
        this.showMsg = errors
        this.message = errors ? errors[0].message : ''
        if (cb) cb(this.message)
      })
    },
    resetField () {
      this.message = ''
      this.form.model[this.prop] = this.initialValue
    }
  },
  mounted () {
    if (this.prop) {
      this.dispatch('VForm', 'addField', this)
      this.initialValue = this.fieldValue
      this.setRules()
    }
  },
  beforeDestroy () {
    this.dispatch('VForm', 'removeField', this)
  }
}
</script>
<style lang="scss">
.formitem{
  min-height: 30px;
  .message{
    color: red;
    font-size: 12px;
    height: 1em;
    padding: 4px;
    text-align: right;
  }
  .flex{
    display: flex;
    align-items: center;
  }
  .label{
    min-width: 5em;
    flex: 1 0 0;
  }
}
</style>
