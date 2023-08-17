<script setup>
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useStoreUser } from '../stores/storeUser';
import UploadPhotoModal from './UploadPhotoModal.vue';

const route = useRoute()
const { username: profileUsername } = route.params

const store = useStoreUser()
const { user } = storeToRefs(store)

const props = defineProps(['username','userInfo','addNewPost'])

</script>

<template>
  <div class="userbar-container">
    <div class="top-content">
      <aTypographyTitle :level="2">{{ props.username }}</aTypographyTitle>
      <UploadPhotoModal
        v-if="user && user.username === profileUsername"
        :addNewPost="addNewPost"
      />
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

.top-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>