<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useStoreUser } from '../stores/storeUser';
import { supabase } from '../supabase';
import Card from './Card.vue';
import Observer from './Observer.vue';

const store = useStoreUser()
const { user } = storeToRefs(store)

const posts = ref([])
const ownerIds = ref([])
const lastCardIndex = ref(2)
const reachedEnd = ref(false)

async function fetchData() {
  // fetch the IDs of the users that you are following
  const { data: followings } = await supabase
    .from('follow')
    .select('following_id')
    .eq('follower_id', user.value.id )

    ownerIds.value = followings.map(f => f.following_id)
  
  // fetch posts from the users you are following
  const { data: postsData } = await supabase
    .from('posts')
    .select()
    .in('owner_id', ownerIds.value)
    .range(0,lastCardIndex.value) //only fetch 3
    .order('created_at',{ ascending: false }) //fetch latest posts

    posts.value = postsData
}

async function fetchNextSet() {
  if(!reachedEnd.value) {
    const { data: postsData } = await supabase
    .from('posts')
    .select()
    .in('owner_id', ownerIds.value)
    .range(lastCardIndex.value + 1,lastCardIndex.value + 3) //fetch next 3
    .order('created_at',{ ascending: false }) //fetch latest posts

    //update posts.value
    posts.value = [
      ...posts.value,
      ...postsData
    ]

    //prevent from making unnecessary HTTP requests after reaching the end of the array
    lastCardIndex.value = lastCardIndex.value + 3

    if(!postsData.length) {
      reachedEnd.value = true
    }
  }
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
    <Observer v-if="posts.length" @intersect="fetchNextSet" />
  </div>
</template>


<style lang="scss" scoped>


</style>