<template>
  <div
    class="dialog-wrap"
    v-show="visible">
      <div class="dialog">
        <div class="dialog-header">
          <span class="dialog-title" v-if="title">
            {{title}}
          </span>
        </div>
        <div @click="handleClose" class="closeicon">
          <i class="iconfont icon-baseline-close-px"></i>
        </div>

        <slot></slot>
      </div>
  </div>
</template>
<script>
export default {
  name: 'Dialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    width: String,
    center: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss">
.dialog-wrap{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background: rgba(0, 0, 0, .1);
  z-index: 10;
  .dialog{
    position: relative;
    margin: 0 auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    width: 60%;
    max-width: 600px;
    margin-top: 15vh;
    z-index: 11;
    padding: 0 10px 10px 10px;
  }
  .dialog-header{
    min-height: 40px;
    display: flex;
    align-items: center;
  }
  .closeicon{
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 20;
    cursor: pointer;
    &:hover{
      .iconfont{
        color: red;
      }
    }
  }
}
</style>
