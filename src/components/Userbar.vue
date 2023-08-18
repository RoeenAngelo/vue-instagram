<script setup>
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useStoreUser } from '../stores/storeUser';
import { supabase } from '../supabase';
import UploadPhotoModal from './UploadPhotoModal.vue';

const route = useRoute()
const { username: profileUsername } = route.params

const store = useStoreUser()
const { user } = storeToRefs(store)

const props = defineProps(['user','userInfo','addNewPost', 'isFollowing', 'updateIsFollowing'])


/*
  Follow User
*/
  async function followUser() {
    props.updateIsFollowing(true)
    await supabase.from('follow')
    .insert({
      follower_id: user.value.id,
      following_id: props.user.id
    })
  }

 
/*
  Unfollow User
*/ 
  async function unfollowUser() {
    props.updateIsFollowing(false)
    await supabase.from('follow')
    .delete()
    .eq('follower_id', user.value.id)
    .eq('following_id', props.user.id)
  }

</script>

<template>
  <div v-if="props.user" class="userbar-container">
    <div class="top-content">
      <aTypographyTitle :level="2">{{ props.user.username }}</aTypographyTitle>
      <div v-if="user">
        <UploadPhotoModal
          v-if="user.username === profileUsername"
          :addNewPost="addNewPost"
        />
        <div v-else>
          <AButton v-if="!props.isFollowing" @click="followUser">
            Follow
          </AButton>
          <AButton v-else @click="unfollowUser">
            Following
          </AButton>
        </div>
      </div>
    </div>
    <div class="bottom-content">
      <aTypographyTitle :level="5">{{ userInfo.posts }} posts</aTypographyTitle>
      <aTypographyTitle :level="5">{{ userInfo.followers }} followers</aTypographyTitle>
      <aTypographyTitle :level="5">{{ userInfo.following }} following</aTypographyTitle>
    </div>
  </div>
  <div v-else class="top-content">
    <aTypographyTitle :level="2">User Not Found</aTypographyTitle>
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