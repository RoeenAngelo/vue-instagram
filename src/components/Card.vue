<script setup>

const props = defineProps([
  'post'
])
</script>

<template>
  <ACard class="card" hoverable style="width: 240px">
    <template #cover>
      <img alt="example" :src="post.url" />
    </template>
    <ACard-meta :title="post.username">
      <template #description>{{ post.caption }}</template>
    </ACard-meta>
  </ACard>
</template>


<style lang="scss" scoped>
.card {
  margin-bottom: 20px;
}
</style>