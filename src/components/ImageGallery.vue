<script setup>

const props = defineProps(['posts'])
</script>

<template>
  <div class="image-gallery-container">
    <img
      v-for="post in props.posts"
      :key="post.id"
      alt=""
      :src="post.image"
    >
  </div>
</template>



<style lang="scss" scoped>
.image-gallery-container {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}

img {
  margin: 5px;
  width: 200px;
}
</style>