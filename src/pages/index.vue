<template>
  <div class="top">
    <Tutorial />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.top {
  @include mq-pc {
    background-color: red;
  }
  @include mq-sp {
    background-color: blue;
  }
}
</style>
