<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useStoreUser } from '../stores/storeUser';
import { supabase } from '../supabase';
import Card from './Card.vue';

const store = useStoreUser()
const { user } = storeToRefs(store)

const posts = ref([])

async function fetchData() {
  // fetch the IDs of the users that you are following
  const { data: followings } = await supabase
    .from('follow')
    .select('following_id')
    .eq('follower_id', user.value.id )

  const owner_ids = followings.map(f => f.following_id)
  
  // fetch posts from the users you are following
  const { data: postsData } = await supabase
    .from('posts')
    .select()
    .in('owner_id', owner_ids)
    .order('created_at',{ ascending: false }) //fetch latest

  posts.value = postsData
}

onMounted(() => fetchData())
</script>


<template>
  <div class="timeline-container">
    <Card
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>


<style lang="scss" scoped>


</style>