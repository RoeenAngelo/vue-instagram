<script setup>

const props = defineProps(['post'])

const {VITE_BASE_PHOTO_URL} = import.meta.env

</script>

<template>
  <ACard class="card" hoverable style="width: 240px">
    <template #cover>
      <img alt="example" :src="`${VITE_BASE_PHOTO_URL}${post.url}`" />
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