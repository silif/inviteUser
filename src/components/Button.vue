<template>
  <button
    class="button"
    @click="handleClick"
    :disabled="disabled || loading"
    :class="[
      type ? 'button-' + type : '',
      size ? 'button-' + size : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-full': full
      }
    ]"
  >
    <span><slot></slot></span>
    <i class="iconfont icon-Loading" v-if="loading"></i>
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    loading: Boolean,
    disabled: Boolean,
    size: String,
    full: Boolean
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
<style lang="scss">
.button{
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.is-loading{
  position: relative;
  pointer-events: none;
}
.icon-Loading{
   animation:myRotate 10s linear infinite;
}
.is-full{
  width: 100%;
}
@keyframes myRotate{
  0%{ transform: rotate(0deg);}
  50%{ transform: rotate(180deg);}
  100%{ transform: rotate(360deg);}
}
</style>
