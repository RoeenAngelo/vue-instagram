<script setup>
import Container from './Container.vue';
import { onMounted, ref } from 'vue';
import Userbar from './Userbar.vue';
import ImageGallery from './ImageGallery.vue';
import { supabase } from '../supabase';
import { useRoute } from 'vue-router';

const route = useRoute()
const { username } = route.params

const posts = ref([])
const user = ref(null)

function addNewPost(post) {
  posts.value.unshift(post)
}

/*
  Fetch Posts
*/
async function fetchData() {
  // Fetch user data from user table
  const { data: userData } = await supabase
  .from('users')
  .select()
  .eq('username', username)
  .single()

  if(userData) {
    user.value = userData
  }

  // Fetch posts form posts table (We want the entire array, so we don't use single)
  const { data: postsData } = await supabase
  .from('posts')
  .select()
  .eq('owner_id', user.value.id)
  .order('id',{ ascending: false }) // Show latest uploaded photo first


  posts.value = postsData

}


onMounted(() => fetchData())

</script>

<!-- Add :key for userbar inorder to make the route reactive and listen for the username, so
    the userbar will be re-rendered -->
<template>
  <Container>
    <div class="profile-container">
      <Userbar 
        :key="$route.params.username" 
        username="roro"
        :userInfo="{
          posts: 5,
          followers: 500,
          following: 300
        }"
        :addNewPost=addNewPost
      />
      <ImageGallery
        :posts="posts"
      />
    </div>
  </Container>
</template>



<style lang="scss" scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}
</style>