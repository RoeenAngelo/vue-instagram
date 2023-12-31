<script setup>
import Container from "./Container.vue";
import { onMounted, reactive, ref, watch } from "vue";
import Userbar from "./Userbar.vue";
import ImageGallery from "./ImageGallery.vue";
import { supabase } from "../supabase";
import { useRoute } from "vue-router";
import { useStoreUser } from "../stores/storeUser";
import { storeToRefs } from "pinia";

const route = useRoute();
const { username } = route.params;

const store = useStoreUser();
const { user: loggedInUser } = storeToRefs(store);

const posts = ref([]);
const user = ref(null); // A user who is not the logged in user
const loading = ref(false);
const isFollowing = ref(false);

const userInfo = reactive({
  posts: null,
  followers: null,
  following: null,
});

/*
  Toggle Follow-Following
*/
function updateIsFollowing(follow) {
  isFollowing.value = follow;
}

/*
  Add Newly uploaded photo to latest feed
*/
function addNewPost(post) {
  posts.value.unshift(post);
}

/*
  Fetch Posts
*/
async function fetchData() {
  loading.value = true;

  // Fetch user data from user table
  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("username", username)
    .single();

  if (!userData) {
    loading.value = false;
    return (user.value = null);
  }

  user.value = userData;

  // Fetch posts from posts table (We want the entire array, so we don't use single() filter)
  const { data: postsData } = await supabase
    .from("posts")
    .select()
    .eq("owner_id", user.value.id)
    .order("id", { ascending: false }); // Show latest uploaded photo first

  posts.value = postsData;

  await fetchIsFollowing();

  const followerCount = await fetchFollowersCount();
  const followingCount = await fetchFollowingCount();

  // Update userInfo
  userInfo.followers = followerCount;
  userInfo.following = followingCount;
  userInfo.posts = posts.value.length;

  loading.value = false;
}

onMounted(() => fetchData());

/*
  Fetch follow table from Supabase
*/
async function fetchIsFollowing() {
  if (loggedInUser.value && loggedInUser.value.id !== user.value.id) {
    const { data } = await supabase
      .from("follow")
      .select()
      .eq("follower_id", loggedInUser.value.id)
      .eq("following_id", user.value.id)
      .single();

    if (data) {
      isFollowing.value = true;
    }
  }
}

// Since fetchIsFollowing() is being called in fetchData(), there is a chance we may not reach loggedInUser inside fetchIsFollowing, which will make isFollowing.value = false. We then need to watch loggedInUser to avoid this

watch(loggedInUser, () => {
  fetchIsFollowing();
});

/*
   Fetch userInfo (followers, following)
*/
async function fetchFollowersCount() {
  const { count } = await supabase
    .from("follow")
    .select("*", { count: "exact" })
    .eq("following_id", user.value.id);

  return count;
}

async function fetchFollowingCount() {
  const { count } = await supabase
    .from("follow")
    .select("*", { count: "exact" })
    .eq("follower_id", user.value.id);

  return count;
}
</script>

<!-- bind :key to userbar inorder to make the route reactive and listen for the username, so
    the userbar will be re-rendered (persist) -->
<template>
  <Container>
    <div
      v-if="!loading"
      class="profile-container"
    >
      <Userbar
        :key="$route.params.username"
        :user="user"
        :userInfo="userInfo"
        :addNewPost="addNewPost"
        :isFollowing="isFollowing"
        :updateIsFollowing="updateIsFollowing"
      />
      <ImageGallery :posts="posts" />
    </div>
    <div
      v-else
      class="timeline-spinner"
    >
      <ASpin />
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
