<script setup>

const props = defineProps(['username','userInfo'])
</script>

<template>
  <div class="userbar-container">
    <div class="top-content">
      <aTypographyTitle :level="2">{{ props.username }}</aTypographyTitle>
    </div>
    <div class="bottom-content">
      <aTypographyTitle :level="5">{{ userInfo.posts }} posts</aTypographyTitle>
      <aTypographyTitle :level="5">{{ userInfo.followers }} followers</aTypographyTitle>
      <aTypographyTitle :level="5">{{ userInfo.following }} following</aTypographyTitle>
    </div>

  </div>
</template>



<style lang="scss" scoped>
.userbar-container {
  padding-bottom: 75px;
}

.bottom-content {
  display: flex;
  align-items: center;

  h5 {
    margin: 0 !important;
    padding: 0;
    margin-right: 30px !important;
  }
}
</style>