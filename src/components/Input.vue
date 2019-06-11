<template>
  <div :class="['input-box',
  {
    'is-prefix':prefixIcon
  }
  ]">
    <span class="prefix" v-if="$slots.prefix || prefixIcon">
      <slot name="prefix"></slot>
      <i class="input-icon"
      v-if="prefixIcon"
      :class="['iconfont', prefixIcon]">
      </i>
    </span>
    <input
      type="text"
      class="input-inner"
      ref="input"
      :value="currentValue"
      @input="handleInput"
      @blur="handleBlur">
  </div>
</template>
<script>
import emmiter from '@/mixin/emmiter'
export default {
  name: 'Input',
  props: {
    prefixIcon: String,
    value: [String, Number],
    size: String
  },
  mixins: [emmiter],
  data () {
    return {
      currentValue: this.value
    }
  },
  methods: {
    handleInput (evt) {
      const value = evt.target.value
      this.$emit('input', event.target.value)
      this.dispatch('FormItem', 'form.change', value)
    },
    handleBlur () {
      this.$emit('blur', event)
      this.dispatch('FormItem', 'form.blur', this.currentValue)
    }
  },
  watch: {
    value (value) {
      this.currentValue = value
    }
  }
}
</script>
<style lang="scss">
.is-prefix{
    .input-inner{
        padding-left: 30px;
    }
}
.input-box{
    position: relative;
    width: 100%;
    margin-right: 4px;
}
.prefix{
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
}
.input-inner{
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    width: 100%;
}
</style>
