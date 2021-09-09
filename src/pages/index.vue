<template>
  <div class="top">
    <p>
      feasibility-nuxtjs-contentful
    </p>
    <br>
    <nuxt-link to="/article/">
      記事一覧へ
    </nuxt-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.top {
  text-align: center;
  padding: 30px 0;
  @include mq-pc {}
  @include mq-sp {}
}
</style>
