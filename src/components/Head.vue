<template>
  <header>
    <h1 class="name">BROCCOLI & CO.</h1>
  </header>
</template>
<script>
export default {
  name: 'Head'
}
</script>
<style lang="scss">
header{
  position:fixed;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #eee;
  height: 30px;
  line-height: 30px;
  .name{
    max-width: 1000px;
    margin: auto;
    padding: 0 1em;
    font-size: 20px;
  }
}
</style>
